import fs from 'fs-extra';
import path from 'path';
import { getExt } from './';

export interface IFileDirStat {
  name: string;
  file: string;
  url: string;
  extCls?: string;
  size?: number;
  isDirectory?: boolean;
  isFile?: boolean;
}

export default async (dir: string, projectPath: string) => {
  const files = await fs.readdir(dir);
  const fileDir: IFileDirStat[] = files.map(file => ({
    name: file,
    file: path.join(dir, file),
    url: path.join(dir, file).replace(projectPath, ''),
  }));
  return Promise.all(fileDir.map(async (item: IFileDirStat) => {
    const stat = await fs.stat(item.file);
    item.size = stat.size;
    item.extCls = '';
    if (stat.isDirectory()) {
      item.extCls = 'dir';
      item.isDirectory = true;
    } else if (stat.isFile()) {
      item.extCls = getExt(item.file);
      item.isFile = true;
    }
    return item;
  }));
}