#!/usr/bin/env node

var commands = require("../lib/commands");
var chalk    = require("chalk");
var meow     = require("meow");
var init     = require("../lib/init");

var cli = meow([
  "Usage",
  "  $ lerna [command]",
  "",
  "Commands:",
  "  bootstrap  Link together local packages and npm install remaining package dependencies",
  "  publish    Publish updated packages to npm",
  "  updated    Check which packages have changed since the last release",
  "",
  "Options:",
  "  --independent, -i  Version packages independently"
], {
  alias: {
    independent: "i"
  }
});

require("signal-exit").unload();

var commandName = cli.input[0];
var command = commands[commandName];

if (!command) {
  console.log();
  console.log(chalk.red("  Invalid command: " + chalk.bold(commandName)));
  cli.showHelp();
}

var config = init(commandName, process.cwd(), cli.flags.independent);

command(config);
