#!/usr/bin/env node

var yargs = require('yargs')
var pkg = require('../package.json')
var server = require('../index')
var server = require('../index')
var color = require('colorful')
  
var argv = yargs
  .usage('\n\nThis is simple server!\n\nUsage: $0 [options]')
  .help('help').alias('help', 'h')
  .version('\n '+pkg.version+'\n', 'version').alias('version', ['V','v'])
  .options({
    port: {
        alias: 'p',
        // required: true,
        requiresArg: true,
        describe: "Set the port!",
        type: "Number"
    }
  })
  .requiresArg(false)
  .locale('en')
  .epilog('  copyright 2015 \n')
  .argv;

// console.dir(argv);
// console.dir(!isNaN(argv.port));
// console.log("message:$1");

if(argv.port){
    if(isNaN(argv.port)){
        return console.log(color.red('\n    "'+ argv.port +'" is not a numeric type.\n'));
    }else{
        server(argv.port);
    } 
}else{
    server();
}