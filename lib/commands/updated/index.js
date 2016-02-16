'use strict';

const checkUpdatedPackages = require('../../utils/check_updated_packages');
const log = require('../../utils/log');
const chalk = require('chalk');

module.exports = function updated(config) {
  const changedPackages = checkUpdatedPackages(config.packagesLoc)
          .map(pkg => pkg.name);

  if (!changedPackages.length) {
    log.error(chalk.red('No updated packages. Have you checked in your changes?'));
    process.exit(1);
  } else {
    log('Changed packages:');
    log(changedPackages.join('\n'), true);
  }
};
