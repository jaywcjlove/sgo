
import { IFileDirStat } from './getFileDirectory';

interface IData {
  files: IFileDirStat[];
  dotFiles: IFileDirStat[];
  dirs: IFileDirStat[];
  dotDirs: IFileDirStat[];
  others: IFileDirStat[];
}

export default (dirs: IFileDirStat[]) => {
  const data: IData = { files: [], dotFiles: [], dirs: [], dotDirs: [], others: [] };
  dirs.forEach((item) => {
    if (item.isDirectory && /^\./.test(item.name)) {
      data.dotDirs.push(item);
    } else if (item.isDirectory) {
      data.dirs.push(item);
    } else if (item.isFile && /^\./.test(item.name)) {
      data.dotFiles.push(item);
    } else if (item.isFile && /^\./.test(item.name)) {
      data.files.push(item);
    } else {
      data.others.push(item)
    }
  });
  const temp: IFileDirStat[] = [];
  data.dirs.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
  data.dotDirs.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
  data.files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
  data.dotFiles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
  data.others.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
  return temp.concat(data.dotDirs).concat(data.dirs).concat(data.dotFiles).concat(data.files).concat(data.others);
}