import { ICommandExec } from '../../core/executor/command.types';
import { FileService } from '../../core/files/file.service';

export class FfmpegBuilder {
  private fileService = new FileService;

  private sourceFilePath: string
  private targetFilePath: string
  private targetWidth: number
  private targetHeight: number

  constructor(sourceFilePath?: string) {
    if(sourceFilePath) {
      this.source(sourceFilePath)
    }
  }

  public build(): ICommandExec {
    if (!this.sourceFilePath) {
      throw new Error('Missing source file path')
    }

    if (!this.targetFilePath) {
      this.targetFilePath = this.fileService.prefixFileName(this.sourceFilePath, 'out-');
    }

    return {
      command: 'ffmpeg',
      args: [
        '-v',
        'warning',
        '-i',
        this.sourceFilePath,
        '-c:v',
        'libx264',
        '-s',
        `${this.targetWidth ?? 1920}x${this.targetHeight ?? 1080}`,
        this.targetFilePath
      ]
    }
  }

  public source(filePath: string): this {
    this.sourceFilePath = this.fileService.getFilePath('', filePath);
    return this;
  }

  public target(filePath: string): this {
    this.targetFilePath = this.fileService.getFilePath('', filePath);
    return this;
  }

  public width(width: number): this {
    this.targetWidth = width;
    return this;
  }

  public height(height: number): this {
    this.targetHeight = height;
    return this;
  }
}
