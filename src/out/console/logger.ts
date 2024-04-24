import { IStreamLogger } from '../../core/handlers/stream-logger.interface';

export class ConsoleLogger implements IStreamLogger {
  private static instance: ConsoleLogger

  private constructor() { }

  static getLogger(): ConsoleLogger {
    if (!ConsoleLogger.instance) {
      ConsoleLogger.instance = new ConsoleLogger()
    }

    return ConsoleLogger.instance;
  }

  log(...args: any[]): void {
    console.log(...args);
  }
  error(...args: any[]): void {
    console.error(...args);
  }
  start(): void {
    console.time('ConsoleLogger')
    console.timeLog('ConsoleLogger',  'Start...');
  }

  end(): void {
    console.timeLog('ConsoleLogger',  'Done.');
  }

}