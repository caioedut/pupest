export default class FailException extends Error {
  command: string;
  params: any[];

  constructor(message: string, command: string, params: any[]) {
    super(message);
    this.name = 'FailException';
    this.command = command;
    this.params = params;
  }
}
