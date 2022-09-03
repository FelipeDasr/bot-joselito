import util from 'util';
import fs from 'fs';

export const createFile = async (data: Buffer, fileFile: string) => {
    const writeFile = util.promisify(fs.writeFileSync);
    await writeFile(fileFile, data, {});
}