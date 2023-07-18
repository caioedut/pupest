import { Pupest } from '../index';
import stdout from '../stdout';
import FailException from '../exceptions/FailException';

export default async function click(selector: string) {
  // @ts-expect-error
  const { scope, options } = this as Pupest;

  if (options.verbose) {
    stdout.info('click', 'COMMAND');
  }

  try {
    if (!scope) {
      throw new Error('Unable to find the page.');
    }

    await scope.waitForSelector(selector);
    await scope.click(selector);
  } catch (err: any) {
    throw new FailException(err?.message, 'find', [selector]);
  }
}
