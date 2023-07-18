import { Pupest } from '../index';
import stdout from '../stdout';
import FailException from '../exceptions/FailException';

export default async function select(selector: string, ...values: string[]) {
  // @ts-expect-error
  const { scope, options } = this as Pupest;

  if (options.verbose) {
    stdout.info('select', 'COMMAND');
  }

  try {
    if (!scope) {
      throw new Error('Unable to find the page.');
    }

    await scope.waitForSelector(selector);
    await scope.select(selector, ...values);
  } catch (err: any) {
    throw new FailException(err?.message, 'select', [selector, ...values]);
  }
}
