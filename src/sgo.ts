#!/usr/bin/env node

import yargs from 'yargs';
import server from './server';


const command = yargs
  .usage('Usage: $0 [options]')
  .option('port', {
    alias: 'p',
    describe: 'Set the port.',
    type: 'number',
    default: Number(process.env.PORT) || 1987,
  })
  .option('reload-port', {
    describe: 'Set the reload port.',
    type: 'number',
    default: 19872,
  })
  .option('reload', {
    alias: 'r',
    describe: 'browser from reloading when files change.',
    type: 'boolean',
    default: true,
  })
  .option('dir', {
    alias: 'd',
    describe: 'Specified directory.',
    type: 'string',
    default: '',
  })
  .option('browser', {
    alias: 'b',
    describe: 'Browser from opening when the server starts.',
    type: 'boolean',
    default: true,
  })
  .option('fallback', {
    describe: 'The file served for all non-file requests.',
    type: 'string',
    default: '',
  })
  .option('help', {
    alias: 'h',
    describe: 'Show help.',
    type: 'boolean',
  })
  .help()
  .example('\n$ sgo', '\nStart a dev server.')
  .example('$ sgo --no-browser', 'Prevents the browser from opening when the server starts.')
  .example('$ sgo --no-reload', 'prevents the browser from reloading when files change.')
  .example('$ sgo --fallback dir/index.html', 'The file served for all non-file requests..')
  .example('$ sgo -p 2019', 'Designated port.')
  .example('$ sgo -d node_modules/dir', 'Specified directory "node_modules/dir".')
  .locale('en')
  .epilog('Copyright 2019 \n')
  .argv;

if (command.h) {
  yargs.help().showHelp();
} else {
  server(command);
}
