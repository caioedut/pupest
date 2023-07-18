import { Pupest } from '../index';
import stdout from '../stdout';
import FailException from '../exceptions/FailException';
import { basename, dirname, join } from 'path';

export default async function screenshot(path?: string) {
  // @ts-expect-error
  const { page, options, path: testFile } = this as Pupest;

  if (options.verbose) {
    stdout.info('screenshot', 'COMMAND');
  }

  try {
    if (!page) {
      throw new Error('Unable to find the page.');
    }

    await page.screenshot({
      path: path ?? join(dirname(testFile), `${basename(testFile, '.js')}_${Date.now()}.png`),
      type: 'png',
      fullPage: true,
    });
  } catch (err: any) {
    throw new FailException(err?.message, 'screenshot', [path]);
  }
}
