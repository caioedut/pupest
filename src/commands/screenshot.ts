import { basename, dirname, join } from 'path';

import FailException from '../exceptions/FailException';
import { Pupest } from '../index';
import stdout from '../stdout';

export default async function screenshot(path?: string) {
  // @ts-expect-error
  const { options, page, path: testFile } = this as Pupest;

  if (options.verbose) {
    stdout.info('screenshot', 'COMMAND');
  }

  try {
    if (!page) {
      throw new Error('Unable to find the page.');
    }

    await page.screenshot({
      fullPage: true,
      path: path ?? join(dirname(testFile), `${basename(testFile, '.js')}_${Date.now()}.png`),
      type: 'png',
    });
  } catch (err: any) {
    throw new FailException(err?.message, 'screenshot', [path]);
  }
}
