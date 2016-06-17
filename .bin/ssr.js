#!/usr/bin/env node

var yargs = require('yargs');
var pkg = require('../package.json');
var server = require('../index');
var color = require('colors-cli');
  
var argv = yargs
  .usage('\n\nThis is simple server!\n\nUsage: $0 [options]')
  .help('help').alias('help', 'h')
  .version('\n => '+pkg.version+'\n', 'version').alias('version', ['V','v'])
  .options({
    port: {
        alias: 'p',
        // required: true,
        // requiresArg: true,
        describe: "Set the port!",
        type: "number"
    },
    cors: {
        alias: 'c',
        // required: true,
        // requiresArg: true,
        describe: "allows cross origin access serving",
        type: "boolean"
    },
    proxy: {
        describe: "Local data mock",
        type: "string"
    }
  })
  .requiresArg(true)
  .locale('en')
  .epilog('  copyright 2015 \n')
  .argv;

if(argv.cors || argv.port){

    if(argv.port&&isNaN(argv.port) || argv.port === true ) return console.log(color.red('\n    "Port" parameter is not of type number.\n'));
    if(argv.port < 1029 ) return console.log(color.red('\n    "Port" number must be greater than the 1299.\n'));
    server(argv);

}else{
    server(argv);
}