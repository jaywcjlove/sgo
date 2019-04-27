import path from 'path';
import fs from 'fs-extra';
import ejs from 'ejs';
import { sendFile, sendError, splitPath } from './index';
import { IServerResponse } from './props';
import getFileDirectory from './getFileDirectory';
import sortDirs from './sortDirs';


export default async (res: IServerResponse, resource: string, message?: string) => {
  const filename: string = path.join(__dirname, '404.ejs');
  let html: string = '';
  try {
    if (res.fileDir && res.projectDir) {
      let dirs = await getFileDirectory(res.fileDir, res.projectDir);
      dirs = sortDirs(dirs);
      html = (await fs.readFile(filename)).toString();
      const nav = [...splitPath(res.pathname)];
      html = await ejs.render(html, {
        title: `Files within ssr${(nav[nav.length - 1] && nav[nav.length - 1].path) || '/'}`,
        nav,
        projectName: path.basename(res.projectDir),
        date: [...dirs]
      }, { filename });
    }
  } catch (error) {
    console.log(error.message);
  }

  sendFile(res, resource, 404, html, 'html');
  return sendError(res, decodeURI(resource), 404);
}