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
function convertToApi(systemId, systemName, apiId, apiDetails, wsdl, openApi, badgeURL) {

    //This is what will need to be used for the call to the Azure REST Endpoint
    //Or we could use as the name in the ARM template
    const id = systemId.toLowerCase() + '-' + apiId;

    let statusTooltip = "";
    let accessTooltip = "";

    switch(apiDetails.status)
    {
        case "experimental":
            statusTooltip = "Proof of Concept or Prototype still under development.";
            break;
        case "alpha":
            statusTooltip = "In a test environment and undergoing formal evaluation by a tester.";
            break;
        case "beta":
            statusTooltip = "In a production environment but under pilot and with no SLAs.";
            break;
        case "stable":
            statusTooltip = "In a production environment with SLAs.";
            break;
        default:
            statusTooltip = "";
            break;
    }

    switch(apiDetails.access)
    {
        case "internal":
            accessTooltip = "Restricted to NHS applications only.";
            break;
        case "restricted":
            accessTooltip = "Restricted by a formal approval process or by network, e.g. NHS Wales, PSBA, HSCN.";
            break;
        case "public":
            accessTooltip = "Available to registered applications over any network.";
            break;
        default:
            accessTooltip = "";
            break;
    }

    const statusBadge = `<a data-tooltip="${statusTooltip}"><img src="${badgeURL}/status-${apiDetails.status}.svg" alt="status-${apiDetails.status}" style="margin-right:5px;"></a>`;
    const accessBadge = `<a data-tooltip="${accessTooltip}"><img src="${badgeURL}/access-${apiDetails.access}.svg" alt="access-${apiDetails.access}"></a>`;   

    const displayName = (systemName ? systemName + ' - ' : '') + apiDetails.title;
    const description = `_${apiDetails.description}_\n\n<div>${statusBadge}${accessBadge}</div>\n${apiDetails.overview}`;
    
    let patchConfig = null;

    const putConfig = {
        "properties": {
          "path":  systemId.toLowerCase() + '/' + apiId
        }
    }

    const putProperties = putConfig.properties

    if (apiDetails.type.includes("SOAP")){
        putProperties["apiType"] = "soap";
        putProperties["type"] = "soap";

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
           putProperties["description"] = description;
           
           putProperties["protocols"] = [ "https" ];        
        }
    }
    else {
        putProperties["type"] = "http";

        if (openApi){

            openApi.info.title = displayName;
            openApi.info.description = description;

            putProperties["format"] = "openapi";
            putProperties["value"] = yaml.stringify(openApi);
        }
        else {
            putProperties["displayName"] = displayName;
            putProperties["description"] = description;
            
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

function processSystem(systemId, systemDirectory, outDirectory, badgeURL) {
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
                    wsdl = fs.readFileSync(systemDirectory + '/' + apiDir.name + '/spec/service.wsdl', 'utf8')
                }

                let openApi = null;
                if (fs.existsSync(systemDirectory + '/' + apiDir.name + '/spec/open-api.yml'  )){
                    openApi = yaml.parse(fs.readFileSync(systemDirectory + '/' + apiDir.name + '/spec/open-api.yml', 'utf8'));
                }                

                const api = convertToApi(systemId, systemName, apiDir.name, apiDetails, wsdl, openApi, badgeURL);    

                writeApiFiles(api, outDirectory);
            }
        }
    });
} 

exports.processCatalogue =  function processCatalogue(catalogueDirectory, outDirectory, badgeURL) {
    fs.readdir(catalogueDirectory, { withFileTypes : true }, (err, dirents) => {

        if (err) throw err;

        for(const systemDir of dirents){

            if (!systemDir.isDirectory()) continue;

            const systemDirectory = catalogueDirectory + '/' + systemDir.name;
            
            processSystem(systemDir.name, systemDirectory, outDirectory, badgeURL)
        }
    });
}