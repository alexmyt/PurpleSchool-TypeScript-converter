import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from '../handlers/stream-logger.interface';
import { ICommandExec } from './command.types';

export abstract class CommandExecutor<Input> {
  constructor(public logger: IStreamLogger) { }

  protected abstract prompt(): Promise<Input>;
  protected abstract build(input: Input): ICommandExec;
  protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams;
  protected abstract process(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;

  public async execute() {
    const input = await this.prompt();
    const command = this.build(input);
    const stream = this.spawn(command)
    this.process(stream, this.logger)
  }
}
