import http, { ServerResponse, IncomingMessage } from 'http';
import childProcess from 'child_process';
import { Arguments } from 'yargs';
import getPort from 'get-port';
import path from 'path';
import url from 'url';
import fs from 'fs-extra';
import { sendMessage, sendFile, reloadScript, getExt } from './utils';
import notFound from './utils/notFound';
import { IServerResponse } from './utils/props';

export interface IServerArgs extends Arguments {
  port: number;
  dir?: string;
  proxy?: boolean;
  [key: string]: any;
}

export default async (args: IServerArgs) => {
  const reloadPort = await getPort({ port: args.reloadPort });
  const port = await getPort({ port: args.port });
  const rootDir = path.resolve(process.cwd(), args.dir || '');
  if (port !== args.port) {
    console.log(' \x1b[43;1m', 'Warning:', '\x1b[0m', `fall back to a random port ${port}`)
  }

  /**
   * Start file watching server
   */
  http.createServer((req: IncomingMessage, res: ServerResponse) => {
    // Open the event stream for live reload
    res.writeHead(200, {
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*"
    });
    // Send an initial ack event to stop request pending
    sendMessage(res, "connected", "awaiting change");
    // Send a ping event every minute to prevent console errors
    setInterval(sendMessage, 60000, res, "ping", "still waiting");
    // Watch the target directory for changes and trigger reload
    fs.watch(rootDir, { persistent: false, recursive: true }, () => {
      sendMessage(res, "message", "reloading page");
      // console.log("\n \x1b[44m", "RELOADING", "\x1b[0m\n");
    });
  }).listen(reloadPort);

  http.createServer(async (req: IncomingMessage, res: IServerResponse) => {
    let pathname = url.parse(req.url || '').pathname || '';
    let filePath = path.join(rootDir, pathname);
    const isExists = await fs.pathExists(filePath);
    res.projectDir = rootDir;
    res.pathname = pathname;
    if (!isExists) {
      return notFound(res, pathname, 'Not Found');
    }

    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      const isIndexExists = await fs.pathExists(path.join(filePath, 'index.html'));
      if (!isIndexExists) {
        res.fileDir = filePath;
        return notFound(res, path.join(pathname, 'index.html'));
      }
      filePath = path.join(filePath, 'index.html');
      pathname = path.join(pathname, 'index.html');
    }
    let fileStr = await fs.readFile(filePath, 'binary')
    const ext = getExt(filePath);
    sendFile(res, pathname, 200, ext === 'html' ? fileStr + reloadScript(reloadPort) : fileStr, ext);
  }).listen(port);

  console.log(`\n 🗂  Serving files from\x1b[33;1m ./${args.dir}\x1b[0m on \x1b[32;1m http://localhost:${port} \x1b[0m`);
  console.log(` 🖥  Using\x1b[32;1m index.html\x1b[0m as the fallback for route requests`);
  console.log(` ♻️  Reloading the browser when files under\x1b[33;1m ./${args.dir}\x1b[0m change\n`);

  const open = process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open';
  args.browser && childProcess.exec(`${open} http://localhost:${port}`)
  
}