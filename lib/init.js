'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const log = require('./utils/log');

function ensurePackagesDir(packagesLoc) {
  if (!fs.existsSync(packagesLoc)) {
    log('Creating packages folder.');
    fs.mkdirSync(packagesLoc);
  }
}

function ensurePackageJSON(packageLoc, basketVersion) {
  if (!fs.existsSync(packageLoc)) {
    log('Creating package.json');
    fs.writeFileSync(packageLoc, JSON.stringify({
      private: true,
      dependencies: {
        basket: '^' + basketVersion
      }
    }, null, '  '));
  }
}

function ensureVersion(versionLoc) {
  if (fs.existsSync(versionLoc)) {
    return fs.readFileSync(versionLoc, 'utf8').trim();
  } else {
    log('Creating VERSION file.');
    fs.writeFileSync(versionLoc, '0.0.0');
    return '0.0.0';
  }
}

module.exports = function init(cmd, cwd) {
  const version = require('../package.json').version;

  log(`\n${chalk.bold(`Basket ${cmd} v${version}`)}\n`);

  const config = {};

  config.packagesLoc = path.join(cwd, 'packages');
  config.packageLoc = path.join(cwd, 'package.json');
  config.versionLoc = path.join(cwd, 'VERSION');
  config.currentVersion = ensureVersion(config.versionLoc);

  ensurePackagesDir(config.packagesLoc);
  ensurePackageJSON(config.packageLoc, version);

  log(`Current version: ${config.currentVersion}
Version file location: ${config.versionLoc}
Packages location: ${config.packagesLoc}\n`);

  return config;
};
