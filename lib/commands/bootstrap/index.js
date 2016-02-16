'use strict';

const bootstrapPackages = require('./bootstrap_packages');
const chalk = require('chalk');
const log = require('../../utils/log');

module.exports = function bootstrap(config) {
  bootstrapPackages(config.packagesLoc, config.currentVersion, function(err, packages) {
    if (err) {
      log.error(err);
      process.exit(1);
    } else {
      log(chalk.green(`Successfully bootstrapped ${packages.length} packages.`));
      process.exit();
    }
  });
};
