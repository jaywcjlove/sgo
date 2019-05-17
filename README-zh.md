[English](README.md)

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

用于快速原型设计的开发服务。它提供了一个简洁的界面，用于列出目录的内容并切换到子文件夹，以当前目录为根目录快速起一个静态服务。

此外，它在提供静态站点方面也很棒。 如果目录包含 `index.html` ，则serve将自动呈现它而不是提供目录内容，并将任何 `.html` 文件作为呈现页面而不是文件内容作为明文提供。

<img src="./img/ssr-safari.png">

#### `特征`

🗂 提供目录中的脚本，样式，图像等静态内容。   
🖥 将所有非文件请求（如`/`或`/ admin`）重新路由到单个文件。   
♻️ 添加，删除或修改项目文件时重新加载浏览器。  
📚 可读的 TypeScript 源代码，鼓励学习和贡献。  
💥 删除冗余的 [proxy](https://github.com/jaywcjlove/mocker-api) 功能, 代理功能请使用 [mocker-api](https://github.com/jaywcjlove/mocker-api)。  
⚛️ 支持预览 React/Vue/Angular 项目的静态页面。

<br />

### 快速开始

使用 `npm i ssr -D` 添加 `ssr` 作为 `dev` 依赖项或直接从终端运行：

```bash
npm install -g ssr # 全局安装 ssr
ssr # 创建一个服务
# 或者
npx ssr [--port] [--dir]
```

<br />

### 命令帮助

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

在项目的 `package.json` 文件中使用 `npm` 脚本的示例：

```json
{
  "scripts": {
    "start": "npx ssr -p 2019"
  }
}
```

<br />

### 在 Node.js 中使用

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