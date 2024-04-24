import { stat, unlink } from 'fs/promises';
import { format, join, parse, resolve } from 'path';

export class FileService {
  public async isFileExists(path: string) {
    try {
      await stat(path);
      return true
    } catch {
      return false
    }
  }

  public getFilePath(dir: string, name: string, ext?: string) {
    return resolve(format({ dir, name, ext }))
  }

  public prefixFileName(filename: string, prefix: string) {
    const pathParts = parse(filename);
    return join(pathParts.dir, `${prefix}${pathParts.name}${pathParts.ext}`);
  }

  async deleteFileIfExists(path: string) {
    if (await this.isFileExists(path)) {
      return unlink(path);
    }
  }
}
