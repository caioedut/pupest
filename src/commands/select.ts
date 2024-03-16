import type { Pupest } from '../index';

import FailException from '../exceptions/FailException';
import stdout from '../stdout';

export default async function select(selector: string, ...values: string[]) {
  // @ts-expect-error
  const { options, scope } = this as Pupest;

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
