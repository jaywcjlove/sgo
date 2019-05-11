<p align="center">
  <a href="https://github.com/jaywcjlove/ssr">
    <img src="./img/logo.svg?sanitize=true">
  </a>
</p>

<p align="center">
  <a href="https://github.com/jaywcjlove/ssr/issues">
    <img src="https://img.shields.io/github/issues/jaywcjlove/ssr.svg">
  </a>
  <a href="https://github.com/jaywcjlove/ssr/network">
    <img src="https://img.shields.io/github/forks/jaywcjlove/ssr.svg">
  </a>
  <a href="https://github.com/jaywcjlove/ssr/stargazers">
    <img src="https://img.shields.io/github/stars/jaywcjlove/ssr.svg">
  </a>
  <a href="https://github.com/jaywcjlove/ssr/releases">
    <img src="https://img.shields.io/github/release/jaywcjlove/ssr.svg">
  </a>
  <a href="https://www.npmjs.com/package/ssr">
    <img src="https://img.shields.io/npm/v/ssr.svg">
  </a>
</p>

<img align="right" width="250" src="./img/ssr.png">

A dev server for rapid prototyping. It provides a neat interface for listing the directory's contents and switching into sub folders.

In addition, it's also awesome when it comes to serving static sites. If a directory contains an index.html, serve will automatically render it instead of serving directory contents, and will serve any .html file as a rendered page instead of file's content as plaintext.

<img src="./img/ssr-safari.png">

#### `Features`

- 🗂 Serve static content like scripts, styles, images from a directory.  
- 🖥 Reroute all non-file requests like `/` or `/admin` to a single file.  
- ♻️ Reload the browser when project files get added, removed or modified.  
- 📚 Readable source code that encourages learning and contribution.  
- 💥 Remove the redundancy [proxy](https://github.com/jaywcjlove/mocker-api) feature, Please use [mocker-api](https://github.com/jaywcjlove/mocker-api).  
- ⚛️ Preview the static page of the React/Vue/Angular project.  

<br />

### Quick Start

Add ssr as a dev dependency using `npm i ssr -D` or run directly from the terminal:

```bash
npm install -g ssr # install ssr
ssr # Create server
# or
npx ssr [--port] [--dir]
```

<br />

### Command help

```bash
Usage: ssr [options]

Options:
  --version      Show version number                                   [boolean]
  --port, -p     Set the port.                          [number] [default: 1987]
  --reload-port  Set the reload port.                  [number] [default: 19872]
  --reload, -r   browser from reloading when files change.
                                                       [boolean] [default: true]
  --dir, -d      Specified directory.                     [string] [default: ""]
  --browser, -b  Browser from opening when the server starts.
                                                       [boolean] [default: true]
  --fallback     The file served for all non-file requests.
                                                          [string] [default: ""]
  --help         Show help                                             [boolean]

Examples:

  $ ssr                            Start a dev server.
  $ ssr --no-browser               Prevents the browser from opening when the
                                   server starts.
  $ ssr --no-reload                prevents the browser from reloading when
                                   files change.
  $ ssr --fallback dir/index.html  The file served for all non-file requests..
  $ ssr -p 2019                    Designated port.
  $ ssr -d node_modules/dir        Specified directory "node_modules/dir".

Copyright 2019
```

Example usage with npm scripts in a project's package.json file:

```json
{
  "scripts": {
    "start": "npx ssr -p 2019"
  }
}
```

<br />

### Used in Node.js

```js
const ssr = require('ssr');

// Create server
ssr.default({ port: 1987, dir: '' });
```

```js
import server from 'ssr';

// Create server
server({ port: 1987, dir: '' });
```

<br />

### License

MIT © Kenny Wong