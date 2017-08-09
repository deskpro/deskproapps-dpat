"use strict";

const program = require("commander");
const archiver = require("archiver");
const fs = require("fs");

const defaultWebpackConfig = require.resolve('../webpack/webpack.config-distribution');
const __path = require("path");
const webpackPath = __path.resolve(__dirname, '../../../../node_modules/.bin/webpack');
const dpatModules = __path.resolve(__dirname, '../../../../node_modules');

const project = require("../Project");
/**
 * @param {String} path
 * @param {Command} cmd
 */
function action(path, cmd)
{
  let projectDir;
  if (path) {
    projectDir = __path.resolve(path);
  } else {
    projectDir = __path.resolve('.');
  }

  const dpProject = project.newInstance();

  if (! dpProject.runPrepareCompile(projectDir)) {
    process.exit(1);
  }

  const runConfig = { webpack: webpackPath, webpackConfig: defaultWebpackConfig, modulePaths: [ dpatModules ]};
  if (! dpProject.runCompile(projectDir, runConfig)) {
    process.exit(1);
  }

  console.log('SUCCESS: Project compiled');
}

program
  .version("0.1.0", "-V, --version")
  .arguments("<path>")
  .action(action)
  .parse(process.argv);
