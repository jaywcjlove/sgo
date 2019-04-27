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
  .option('dir', {
    alias: 'd',
    describe: 'Specified directory.',
    type: 'string',
    default: '',
  })
  .option('help', {
    alias: 'h',
    describe: 'Show help.',
    type: 'boolean',
  })
  .help()
  .example('\n$ ssr', '\nStart a dev server.')
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
