const core = require('@actions/core');
const github = require('@actions/github');
const processor = require('./module')

try {

  const catDir = core.getInput('catalogueDirectory');
  const outDir = core.getInput('outputDirectory');
  
  const badgeURL = `https://raw.githubusercontent.com/${process.env.GITHUB_REPOSITORY}/${process.env.GITHUB_SHA}/media/badges`;

  processor.processCatalogue(catDir , outDir, badgeURL);
  
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

