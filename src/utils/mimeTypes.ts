import types from './types.json';

const mimes = Object.entries(types).reduce(
    (all, [type, exts]) =>
        Object.assign(all, ...(exts as any[]).map<any>((ext: string) => ({ [ext]: type }))),
    {}
);

export default (ext: string) => mimes[ext] || 'application/octet-stream';
