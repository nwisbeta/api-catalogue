#!/usr/bin/env node

const fs = require('fs')
const crypto = require('crypto');
const https = require('https')

const cli = initCli("context", "apimInstance", "apimAccessKey")

const sasToken = createSharedAccessToken("integration", cli.args["apimAccessKey"], 2)

process.chdir(cli.args["context"]);

fs.readdir('./', { withFileTypes: true }, (err, dirents) => {

    if (err) throw err

    let httpRequests = []

    for (const dirent of dirents) {

        let httpRequest = null
        if (dirent.isFile() && (httpRequest = extractHttpRequest(dirent, cli.args["apimInstance"], sasToken))) {
            httpRequests.push(httpRequest)            
        }            
    }
    sendAllRequests(httpRequests)  

})

function createSharedAccessToken(apimUid, apimAccessKey, validForDays = 1) {

    const x = new Date()
    x.setDate(x.getDate() + validForDays)
    let expiry = x.toISOString().replace("Z", "0000Z")

    const signature = crypto.createHmac('sha512', apimAccessKey).update(`${apimUid}\n${expiry}`).digest('base64');
    const sasToken = `SharedAccessSignature uid=${apimUid}&ex=${expiry}&sn=${signature}`;

    return sasToken;
}

//Regex for API template files, e.g. "my-awesomme-api-name.PATCH.json"     
const fileRegex = /([^\.]+)\.(GET|PUT|POST|PATCH|DELETE)+\.json$/

function extractHttpRequest(dirent, instanceName, sasToken) {

    const arr = fileRegex.exec(dirent.name)

    if (arr === null) return null

    const apiName = arr[1]
    const method = arr[2]

    let data = null;
    try {
        data = JSON.stringify(JSON.parse(fs.readFileSync(dirent.name, 'utf8')))
    } catch (err) {
        cli.logError(`problem parsing JSON from file (${dirent.name}):\n\t${err}`)
        process.exit()
    }    

    return {
        options: {
            host: `${instanceName}.management.azure-api.net`,
            path: `/subscriptions/x/resourceGroups/x/providers/Microsoft.ApiManagement/service/x/apis/${apiName}?api-version=2019-12-01`,
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": sasToken
            }
        },
        data
    };
}

/**
 * Sends the HTTP requests as requested. PUT requests will sent before any other requests are sent
 * @param {*} httpRequests 
 */
async function sendAllRequests(httpRequests){

    httpRequests.sort(putPutsFirst)

    cli.log(`Processing ${httpRequests.length} requests...`)

    const statusChecks = {}

    for (const request of httpRequests) {

        const path = request.options.path

        try {

            if (statusChecks[path]) {
                cli.log("Checking result of prior requests...")
                let statusCheckResponse = await checkResult(statusChecks[path])
                processResponseFor(statusChecks[path], statusCheckResponse)
                delete statusChecks[path]
                
            }

            const response = await sendRequestAsync(request)

            processResponseFor(request, response)

            if (response.statusCode == 202) {
                //accepted but not completed, add a status check
                statusChecks[path] = createStatusCheckRequest(request, response)
            }
            
        }
        catch (error) {
            cli.logError(error)
            process.exit()
        }

    }

    cli.log("Checking results for any remaining status checks...")
    for (const path in statusChecks) {
        checkResult(statusChecks[path]).then(processResponseFor(statusChecks[path])).catch(cli.logError)
    }
}


function putPutsFirst(req1, req2) {

    m1 = req1.options.method
    m2 = req2.options.method

    if ((m1 === "PUT" && m2 !== "PUT") || (m1 !== "PUT" && m2 === "PUT")) {
        return m1 === "PUT" ? -1 : 1
    }
    else return 0
}

function processResponseFor(req, res){

    if (arguments.length > 1)
        processResponse(res);
    else
        return processResponse;

    function processResponse(response) {
        let message = `PATH: ${req.options.path}\nMETHOD: ${req.options.method}\nRESPONSE: ${response.statusCode}\n`
        if (response.statusCode >= 400) {
            message += `BODY: ${response.body}\n`
            throw `Received ${response.statusCode} response \n${message}`
        }
        cli.log(message)           
    } 
}


function createStatusCheckRequest(request, response){
    const {host, pathname, search} = new URL(response.headers.location)
    return {
        options: {
            host,
            path: pathname + search,
            method: "GET",
            headers : {
                "Authorization": request.options.headers["Authorization"]
            }
        }       
    }
}

async function checkResult(statusCheckRequest){
    const exponentialBackoffs = [500, 1000, 3000, 12000];
    let i = 0; 
    let status = 202;       
    while (status === 202) {
        if (!exponentialBackoffs[i]) {
            throw "Previous request did not complete within allowed time" 
        }
        await new Promise(r => setTimeout(r, exponentialBackoffs[i++]));
        response = await sendRequestAsync(statusCheckRequest)   
        status = response.statusCode    
    }
    return response;
}

function sendRequestAsync(command) {

    return new Promise((resolve, reject) => {

        const request = https.request(command.options, (response) => {

            response.body = '';
            response.on('data', (chunk) => {
                response.body += chunk;
            });
            response.on('end', () => resolve(response));        
        });

        request.on('error', reject);
        request.end(command.data);
    });
}



function initCli() {
    const argNames = Array.from(arguments)
    const args = {}
    const cliArgs = process.argv.slice(2)
    if (cliArgs.length !== argNames.length) {
        printUsage(argNames)
        process.exit()
    }
    else {
        let i = 0;
        for( name of argNames){
            args[name] = cliArgs[i++]
        }
    }

    function log(message) {
        console.log(message)
    }

    function logError(err) {
        console.error("ERROR: " + err)
    }
    
    function printUsage(namedArgs) {  
        const path = require('path')    

        scriptName =  path.basename(process.argv[1])
        console.log(`Usage: node ${scriptName} ${namedArgs.join(" ")}`)
    }

    return {
        args,
        log,
        logError,
        printUsage
    }
}



