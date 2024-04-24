import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

import { CommandExecutor } from '../../core/executor/command.executor';
import { ICommandExec } from '../../core/executor/command.types';
import { IStreamLogger } from '../../core/handlers/stream-logger.interface';
import { IFfmpegInput } from './ffmpeg.types';
import { PromptService } from '../../core/prompt/prompt.service';
import { FfmpegBuilder } from './ffmpeg.builder';
import { StreamHandler } from '../../core/handlers/stream.handler';
import { FileService } from '../../core/files/file.service';

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
  private promptService: PromptService = new PromptService();

  constructor(logger: IStreamLogger) {
    super(logger)
  }

  protected async prompt(): Promise<IFfmpegInput> {
    const fileService = new FileService()

    const sourceFilePath = await this.promptService.input<string>('Source file', 'input');
    const targetFilePath = await this.promptService.input<string>('Target file', 'input', { default: fileService.prefixFileName(sourceFilePath, 'out-') });
    const targetWidth = await this.promptService.input<number>('Target width', 'number', { default: 1920 });
    const targetHeight = await this.promptService.input<number>('Target height', 'number', { default: 1080 });

    return {
      sourceFilePath,
      targetFilePath,
      targetWidth,
      targetHeight
    }
  }

  protected build(input: IFfmpegInput): ICommandExec {
    const command = new FfmpegBuilder(input.sourceFilePath)
      .width(input.targetWidth)
      .height(input.targetHeight)
      .target(input.targetFilePath)
      .build();
    return command;
  }

  protected spawn({ command, args }: ICommandExec): ChildProcessWithoutNullStreams {
    this.logger.log(`Run ${command} ${args.join(' ')}`)
    return spawn(command, args)
  }

  protected process(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }

}