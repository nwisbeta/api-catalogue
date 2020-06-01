const fs = require('fs');
const crypto = require('crypto');
const https = require('https');
const { abort } = require('process');

const args = process.argv.slice(2);

if (args.length !== 3){
    console.log(`usage: node ${process.argv[1]} context apimInstance apimAccessKey`)
    process.exit()
}
   

const context = args[0]
const apimInstance = args[1]
const apimAccessKey = args[2]

process.chdir(context);

const sasToken = createSharedAccessToken("integration", apimAccessKey, 2 )

console.log(process.cwd())

fs.readdir('./', { withFileTypes : true }, (err, dirents) => {

    if (err) throw err

    let httpRequests = []

    for(const dirent of dirents){

        let httpRequest = null
        if (dirent.isFile() && (httpRequest = extractHttpRequest(dirent, apimInstance, sasToken))) {
            httpRequests.push(httpRequest)
        }
    }

    httpRequests.sort(methodPrecedence)

    for(const request of httpRequests){
        const r = https.request(request.options, (res) => { 
            console.log(`PATH: ${request.options.path}\nMETHOD: ${request.options.method}\nRESPONSE: ${res.statusCode}`) 
        })

        r.write(request.data)
        r.on('error', logError)
        r.end()
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

function extractHttpRequest(dirent, instanceName, sasToken) {

    const arr = fileRegex.exec(dirent.name)

    if (arr === null) return null

    const apiName = arr[1]
    const method = arr[2]     
    const data = JSON.stringify(JSON.parse( fs.readFileSync(dirent.name, 'utf8')))

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

function logError(err){
    console.error(err)
}