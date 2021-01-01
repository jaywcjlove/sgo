#!/usr/bin/env node

import minimist from 'minimist';
import server from './server';

;(() => {
  const argvs = minimist(process.argv.slice(2));
  const pkg = require('../package.json');
  if (argvs.v || argvs.version) {
    console.log(` sgo v${pkg.version}`);
    return;
  }
  if (argvs.h || argvs.help) {
    console.log('  Usage: sgo [options]');
    console.log('');
    console.log('  Options:');
    console.log('    --version      Show version number         [boolean]');
    console.log('    --port, -p     Set the port.               [number] [default: 1987]');
    console.log('    --reload-port  Set the reload port.        [number] [default: 19872]');
    console.log('    --reload, -r   browser from reloading when files change.');
    console.log('                     [boolean] [default: true]');
    console.log('    --dir, -d      Specified directory.        [string] [default: ""]');
    console.log('    --browser, -b  Browser from opening when the server starts.');
    console.log('                      [boolean] [default: true]');
    console.log('    --fallback     The file served for all non-file requests.');
    console.log('                                                            [string] [default: ""]');
    console.log('    --help         Show help                                             [boolean]');
    console.log('  ');
    console.log('  Examples:');
    console.log('  ');
    console.log('    $ sgo                            Start a dev server.');
    console.log('    $ sgo --no-browser               Prevents the browser from opening when the');
    console.log('                                     server starts.');
    console.log('    $ sgo --no-reload                prevents the browser from reloading when');
    console.log('                                     files change.');
    console.log('    $ sgo --fallback dir/index.html  The file served for all non-file requests..');
    console.log('    $ sgo -p 2019                    Designated port.');
    console.log('    $ sgo -d node_modules/dir        Specified directory "node_modules/dir".');
    console.log('  ');
    console.log('  Copyright 2020');
    return;
  }

  if (argvs.reload === undefined) argvs.reload = argvs.r = true;
  if (argvs.browser === undefined) argvs.browser = argvs.b = true;
  if (!argvs.port) argvs.port = argvs.p = Number(process.env.PORT) || 1987;
  if (!argvs.dir) argvs.dir = argvs.d = '';
  if (!argvs.fallback) argvs.fallback = '';
  if (!argvs['reload-port'])argvs['reload-port'] = 19872;
  server(argvs);

})();
