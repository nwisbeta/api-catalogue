#!/usr/bin/env node

const fs = require('fs')
const crypto = require('crypto');
const https = require('https')

const cli = initCli("context", "apimInstance", "apimAccessKey")

const sasToken = createSharedAccessToken("integration", cli.args["apimAccessKey"], 2)

process.chdir(cli.args["context"]);

fs.readdir('./', { withFileTypes: true }, (err, dirents) => {

    if (err) throw err

    let httpCommands = []

    for (const dirent of dirents) {

        let httpCommand = null
        if (dirent.isFile() && (httpCommand = extractHttpCommand(dirent, cli.args["apimInstance"], sasToken))) {
            httpCommands.push(httpCommand)
        }
    }

    httpCommands.sort(methodPrecedence)

    for (const command of httpCommands) {

        const request = https.request(command.options, (response) => {
            console.log(`PATH: ${command.options.path}\nMETHOD: ${command.options.method}\nRESPONSE: ${response.statusCode}`)
        })

        request.write(command.data)
        request.on('error', cli.logError)
        request.end()

        console.log(command.options)
        console.log(command.data)
        process.exit()
    }

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

function extractHttpCommand(dirent, instanceName, sasToken) {

    const arr = fileRegex.exec(dirent.name)

    if (arr === null) return null

    const apiName = arr[1]
    const method = arr[2]

    let data = null;
    try {
        data = JSON.stringify(JSON.parse(fs.readFileSync(dirent.name, 'utf8')))
    } catch (err) {
        cli.logError(`Error parsing JSON from file (${dirent.name}):\n\t${err}`)
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

function methodPrecedence(req1, req2) {

    m1 = req1.options.method
    m2 = req2.options.method

    if ((m1 === "PUT" && m2 !== "PUT") || (m1 !== "PUT" && m2 === "PUT")) {
        return m1 === "PUT" ? -1 : 1
    }
    else return 0
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

    function logError(err) {
        console.error(err)
    }
    
    function printUsage(namedArgs) {  
        const path = require('path')    

        scriptName =  path.basename(process.argv[1])
        console.log(`Usage: node ${scriptName} ${namedArgs.join(" ")}`)
    }

    return {
        args,
        logError,
        printUsage
    }
}



