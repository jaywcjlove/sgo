import { ServerResponse } from 'http';
import types from './types.json';

const mime: Record<string, string> = Object.entries(types).reduce(
  (all, [type, exts]) => Object.assign(all, [...exts].map(ext => ({ [ext]: type }))), {}
);

export const isRouteRequest = (uri: string = '') => {
  const arr = uri.split('/').pop();
  return (arr || '').indexOf('.') === -1 ? true : false
}

export const sendMessage = (res: ServerResponse, channel: string, data: string) => {
  res.write(`event: ${channel}\nid: 0\ndata: ${data}\n`);
  res.write("\n\n");
};

export const sendFile = (res: ServerResponse, resource: string, status: number, file: string, ext: string) => {
  
  res.writeHead(status, {
    "Content-Type": mime[ext] || "application/octet-stream",
    "Access-Control-Allow-Origin": "*"
  });
  res.write(file, 'binary');
  res.end();
  if (status !== 404) {
    console.log(" \x1b[42m", status, "\x1b[0m", `${resource}`);
  }
};

export const sendError = (res: ServerResponse, resource: string, status: number) => {
  res.writeHead(status);
  res.end();
  console.log(" \x1b[41m", status, "\x1b[0m", `${resource}`);
};


export const reloadScript = (reloadPort: number) => `
  <script>
    const source = new EventSource('http://localhost:${reloadPort}');
    source.onmessage = e => {
      location.reload(true)
    };
  </script>
`;

/**
 * Get ext
 * @param {String} filePath `/a/b.jpg` => `jpg`
 */
export const getExt = (filePath: string) => filePath.replace(/^.*[\.\/\\]/, "").toLowerCase();


export interface ISplitPath {
  name: string;
  path: string;
}

/**
 * Decompose the path to break the deep route into a level
 * 
 * @param paths 
 * @returns {String[]}
 * Process the data `['/exceptions/not-found/users']` into the following results
 * 
 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 * ```js
 * [
 *  { name: 'exceptions', path: '/exceptions' },
 *  { name: 'not-found', path: '/exceptions/not-found'},
 *  { name: 'users', path: '/exceptions/not-found/users']
 * }
 * ```
 */
export function splitPath(paths: string): ISplitPath[] {
  let result: ISplitPath[] = [];
  if (paths === '/') {
    return result;
  }
  const arr = paths.split('/');
  if (arr.length < 3) {
    result.push({
      name: paths.replace(/^\//, ''),
      path: paths
    });
  } else {
    let tempPath: string = '';
    arr.forEach((pt: string) => {
      tempPath += `${pt ? '/' : ''}${pt || ''}`;
      if (!!tempPath && !result.find(item => item.path === tempPath)) {
        result.push({
          name: pt,
          path: tempPath,
        });
      }
    });
  }
  return result;
}
