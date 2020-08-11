var crypto = require('crypto');
var fs = require('fs');
const { execSync } = require('child_process');

// WATCH FILES
var indexFile = "src/index.js";
var moduleFile = "src/module.js";
var mainFile = "lib/index.js"

function getSha(file) {
    var distFile = fs.readFileSync(file);
    var sha = crypto.createHash('sha1').update(distFile).digest("hex");
    return sha;
}

execSync('git stash --keep-index');

var currentIndexSha = getSha(indexFile);
var currentModuleSha = getSha(moduleFile);
var currentMainFileSha = getSha(mainFile);

execSync('git stash');

var previousIndexSha = getSha(indexFile);
var previousModuleSha = getSha(moduleFile);
var previousMainFileSha = getSha(mainFile);

execSync('git stash pop --index');
execSync('git stash pop');

// Check SRC Files for changes
    // If changed check if lib also changed
        // If not changed - display log message and bundle and add to changes.

if((currentIndexSha !== previousIndexSha) || (currentModuleSha !== previousModuleSha)){
    console.log("api-catalogue-processor changes detected, checking if solution was built...")
    if(currentMainFileSha === previousMainFileSha){
        console.log("Building lib/index.js...");
        execSync('npm run build');
        console.log("Done.");
        
        console.log(`Adding ${mainFile} to your commit...`);
        execSync(`git add ${mainFile}`);
        console.log("Done.");
    }
}