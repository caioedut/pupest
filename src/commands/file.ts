import type { Pupest } from '../index';

import FailException from '../exceptions/FailException';
import stdout from '../stdout';

export default async function file(selector: string, ...paths: string[]) {
  // @ts-expect-error
  const { options, scope } = this as Pupest;

  if (options.verbose) {
    stdout.info('file', 'COMMAND');
  }

  try {
    if (!scope) {
      throw new Error('Unable to find the page.');
    }

    await scope.waitForSelector(selector);

    const $el = await scope.$(selector);

    // @ts-expect-error
    await $el?.uploadFile(...paths);
  } catch (err: any) {
    throw new FailException(err?.message, 'file', [selector, ...paths]);
  }
}
