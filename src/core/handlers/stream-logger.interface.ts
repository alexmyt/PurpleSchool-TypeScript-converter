export interface IStreamLogger {
  log(...args: any[]): void;
  error(...args: any[]): void;
  start(): void;
  end(): void;
}
