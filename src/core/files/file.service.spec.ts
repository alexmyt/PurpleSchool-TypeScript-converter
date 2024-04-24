import { resolve } from 'path';
import { FileService } from './file.service';

describe('file.service', () => {
  it('should return the correct file path when given a valid path, name, and extension', () => {
    const fileService = new FileService();
    const path = '/path/to/file';
    const name = 'file';
    const ext = 'txt';

    const expectedPath = resolve(path, `${name}.${ext}`);

    const result = fileService.getFilePath(path, name, ext);

    expect(result).toBe(expectedPath);
  });

  // Should return a string with the prefix added to the filename
  it('should return a string with the prefix added to the filename when filename is not empty', () => {
    const fileService = new FileService();
    const path = '/path/to/file';
    const name = 'file';
    const ext = 'txt';
    const prefix = 'prefix-';

    const sourcePath = resolve(path, `${name}.${ext}`);
    const expectedPath = resolve(path, `${prefix}${name}.${ext}`);

    const result = fileService.prefixFileName(sourcePath, prefix);
    expect(result).toBe(expectedPath);
  });

})