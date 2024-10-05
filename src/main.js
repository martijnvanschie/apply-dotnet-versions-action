const core = require("@actions/core");
const xpath = require('xpath');
const fs = require('fs');
const { DOMParser, XMLSerializer } = require('xmldom');

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

    core.startGroup("Replace assembly versions");
      replaceXPath(_projectFile, "//Project/PropertyGroup/AssemblyVersion/text()", _versionAssembly);
      replaceXPath(_projectFile, "//Project/PropertyGroup/FileVersion/text()", _versionFile);
      replaceXPath(_projectFile, "//Project/PropertyGroup/InformationalVersion/text()", _versionInformational);
      replaceXPath(_projectFile, "//Project/PropertyGroup/PackageVersion/text()", _filePackage);
    core.endGroup();

    core.info("Action done!");

  } catch (error) {
    core.setFailed(error.message);
  }
}

function replaceXPath(filePath, xpathString, replaceString) {

  const xml = fs.readFileSync(filePath, 'utf8');
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  const nodes = xpath.select(xpathString, doc);

  if (nodes.length > 0) {
    const node = nodes[0];
    core.debug(getNodePath(node));
    node.textContent = replaceString;
  } else {
    core.info(`Node [${xpathString}] not found`);
  }

  fs.writeFileSync(filePath, new XMLSerializer().serializeToString(doc));

}

function getNodePath(node) {
  let parentNode = node.parentNode;
  if (parentNode == null) {
      return node.nodeName;
  }
  return (getNodePath(parentNode)) + "/" + node.nodeName;
}

module.exports = {
  run
};
