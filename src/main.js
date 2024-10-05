const core = require("@actions/core");
const fs = require('fs');

async function run() {
  try {
    core.startGroup("Debug info");
      core.info(`RUNNER_DEBUG = ${process.env.RUNNER_DEBUG}`);
      core.info(`GITHUB_OUTPUT = ${process.env.GITHUB_OUTPUT}`);
    core.endGroup();

    core.debug("Debug is enabled...");

    core.startGroup("Collect input parameters");
      var _versionAssembly = core.getInput("version-assembly", { required: true });
      core.info(`Input assembly version: ${_versionAssembly}`);
      var _versionFile = core.getInput("version-file", { required: true });
      core.info(`Input file version: ${_versionFile}`);
      var _versionInformational = core.getInput("version-informational", { required: true });
      core.info(`Input informational version: ${_versionInformational}`);
      var _filePackage = core.getInput("version-package", { required: true });
      core.info(`Input package version: ${_filePackage}`);
      var _projectFile = core.getInput("projectFile", { required: true });
      core.info(`Input project file: ${_projectFile}`);
    core.endGroup();

    core.startGroup("Verify project file");

      replaceXPath(_projectFile, "dd", "dd");

    core.endGroup();

    core.info("Action done!");

  } catch (error) {
    core.setFailed(error.message);
  }
}

async function replaceXPath(filePath, xpath, replaceString) {

  const content = fs.readFileSync(filePath, 'utf8');
  core.debug(content);

}

module.exports = {
  run,
};
