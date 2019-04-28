import yargs from 'yargs';
import server from './server';


const command = yargs
  .usage('Usage: $0 [options]')
  .option('port', {
    alias: 'p',
    describe: 'Set the port.',
    type: 'number',
    default: 1987,
  })
  .option('reload-port', {
    describe: 'Set the reload port.',
    type: 'number',
    default: 19872,
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
  .option('help', {
    alias: 'h',
    describe: 'Show help.',
    type: 'boolean',
  })
  .help()
  .example('\n$ ssr', '\nStart a dev server.')
  .example('$ ssr --no-browser', 'Prevents the browser from opening when the server starts.')
  .example('$ ssr -p 2019', 'Designated port.')
  .example('$ ssr -d node_modules/dir', 'Designated port.')
  .locale('en')
  .epilog('Copyright 2019 \n')
  .argv;

if (command.h) {
  yargs.help().showHelp();
} else {
  server(command);
}
