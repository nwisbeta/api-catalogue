const processor = require('./module');

const inDir = process.argv[2];
const outDir = process.argv[3];

if (!inDir || !outDir) {
    console.log('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' inDir outDir');
}
else {
    processor.processCatalogue( inDir , outDir);
}