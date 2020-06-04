const processor = require('../src/module');

const inDir = process.argv[2];
const outDir = process.argv[3];

if (!inDir || !outDir) {
    console.log('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' inDir outDir');
}
else {
    processor.processCatalogue( inDir , outDir, "https://raw.githubusercontent.com/nwisbeta/api-catalogue/de2e46900cedf6a3358377e0c8648d32066beca6/media/badges");
}