import { nanoid } from 'nanoid';
import util from 'util';
import fs from 'fs';
import path from 'path';

export const createFile = async (data: Buffer, filePath: string) => {
    const mkdir = util.promisify(fs.mkdir);
    const exists = util.promisify(fs.exists);
    const writeFile = util.promisify(fs.writeFile);

    const tempPath = path.resolve('src', 'temp');

    if (!await exists(tempPath)) await mkdir(tempPath);
    await writeFile(filePath, data, {});
}

export const generateId = () => {
    return nanoid();
}

export const deleteFile = async (filePath: string) => {
    const deleteFile = util.promisify(fs.rm);
    await deleteFile(filePath);
}