const fs = require('fs');
const yaml = require('yaml');


function logError(err){ 
    if (err)
        console.log(err);
}

/**
 * @param {string} systemId The system under which the API is catalogued
 * @param {string} apiId Unique identifier for the API (alphanumeric and hyphens only)
 * @param {any} apiDetails object with API title, type and description
 */
function convertToApi(systemId, systemName, apiId, apiDetails, wsdl, openApi) {

    //This is what will need to be used for the call to the Azure REST Endpoint
    //Or we could use as the name in the ARM template
    const id = systemId.toLowerCase() + '-' + apiId;

    const displayName = (systemName ? systemName + ' - ' : '') + apiDetails.title;
    const description = `_${apiDetails.description}_\n\n${apiDetails.overview}`;
    
    let patchConfig = null;

    const putConfig = {
        "properties": {
          "path":  systemId.toLowerCase() + '/' + apiId
        }
    }

    const putProperties = putConfig.properties

    if (apiDetails.type.includes("SOAP")){
        putProperties["apiType"] = "soap";
        putConfig["type"] = "soap";

        if(wsdl) {
            patchConfig = {
                "properties": {
                    "displayName" : displayName,
                    "description": description
                }
            }

            putProperties["format"] = "wsdl";
            putProperties["value"] = wsdl;
        }
        else {
           putProperties["displayName"] = displayName;
           putConfig["description"] = description;
           
           putProperties["protocols"] = [ "https" ];        
        }
    }
    else {
        putConfig["type"] = "http";

        if (openApi){

            openApi.info.title = displayName;
            openApi.info.description = description;

            putProperties["format"] = "openapi";
            putProperties["value"] = yaml.stringify(openApi);
        }
        else {
            putProperties["displayName"] = displayName;
            putConfig["description"] = description;
            
            putProperties["protocols"] = [ "https" ];
        }
    }


    return {
        id,
        putConfig,
        patchConfig
    };
}

function writeApiFiles(api, outDir) {

    fs.mkdirSync(outDir, {recursive: true});

    fs.writeFile(outDir + api.id + ".PUT.json", JSON.stringify(api.putConfig, null, 2), logError);

    if(api.patchConfig) {
        fs.writeFile(outDir + api.id + ".PATCH.json", JSON.stringify(api.patchConfig, null, 2), logError);
    }    
}

function processSystem(systemId, systemDirectory, outDirectory) {
    fs.readdir(systemDirectory,  { withFileTypes : true }, (err, dirents) => {
        
        if (err) throw err;


        let systemName;
        if (fs.existsSync(systemDirectory + '/' + 'system.yml')) {

            const systemDetails = yaml.parse(fs.readFileSync(systemDirectory + '/' + 'system.yml', 'utf8')); 
            systemName = systemDetails['short-name'];
        }


        for (const apiDir of dirents){

            if (apiDir.isDirectory() && fs.existsSync(systemDirectory + '/' + apiDir.name + '/' + 'api.yml')) {

                const apiDetails = yaml.parse(fs.readFileSync(systemDirectory + '/' + apiDir.name + '/' + 'api.yml', 'utf8'));

                const wsdlExists = fs.existsSync(systemDirectory + '/' + apiDir.name + '/spec/service.wsdl');
                
                let wsdl = null;
                if(wsdlExists) {
                    wsdl = fs.readFileSync(systemDirectory + '/' + apiDir.name + '/spec/service.wsdl')
                }

                let openApi = null;
                if (fs.existsSync(systemDirectory + '/' + apiDir.name + '/spec/open-api.yml'  )){
                    openApi = yaml.parse(fs.readFileSync(systemDirectory + '/' + apiDir.name + '/spec/open-api.yml', 'utf8'));
                }                

                const api = convertToApi(systemId, systemName, apiDir.name, apiDetails, wsdl, openApi);    

                writeApiFiles(api, outDirectory);
            }
        }
    });
} 

exports.processCatalogue =  function processCatalogue(catalogueDirectory, outDirectory) {
    fs.readdir(catalogueDirectory, { withFileTypes : true }, (err, dirents) => {

        if (err) throw err;

        for(const systemDir of dirents){

            if (!systemDir.isDirectory()) continue;

            const systemDirectory = catalogueDirectory + '/' + systemDir.name;
            
            processSystem(systemDir.name, systemDirectory, outDirectory)
        }
    });
}