# ssr

<img align="right" width="250" src="./img/ssr.png">

A dev server for rapid prototyping. It provides a neat interface for listing the directory's contents and switching into sub folders.

In addition, it's also awesome when it comes to serving static sites. If a directory contains an index.html, serve will automatically render it instead of serving directory contents, and will serve any .html file as a rendered page instead of file's content as plaintext.

<img src="./img/ssr-safari.png">

**features**

- 🗂 Serve static content like scripts, styles, images from a directory
- 🖥 Reroute all non-file requests like `/` or `/admin` to a single file
- ♻️ Reload the browser when project files get added, removed or modified
- 📚 Readable source code that encourages learning and contribution
- 💥 Remove the redundancy [proxy](https://github.com/jaywcjlove/mocker-api) feature, Please use [mocker-api](https://github.com/jaywcjlove/mocker-api).

## Usage

Add ssr as a dev dependency using `npm i ssr -D` or run directly from the terminal:

```bash
npx ssr [--port] [--dir]
```
### Install

```
npm install -g ssr 
```

Command help:

```bash
Usage: ssr [options]

Options:
  --version   Show version number                                      [boolean]
  --port, -p  Set the port.                             [number] [default: 1987]
  --dir, -d   Specified directory.                        [string] [default: ""]
  --help      Show help                                                [boolean]

Examples:

  $ ssr                      Start a dev server.
  $ ssr -p 2019              Designated port.
  $ ssr -d node_modules/dir  Designated port.
```
