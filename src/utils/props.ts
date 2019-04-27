import { ServerResponse } from 'http';

export interface IServerResponse extends ServerResponse {
  fileDir: string;
  projectDir: string;
  pathname: string;
}
