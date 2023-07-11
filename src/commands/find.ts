import { Pupest } from '../index';
import stdout from '../stdout';
import FailException from '../exceptions/FailException';

export default async function find(selector: string) {
  // @ts-expect-error
  const { page, options } = this as Pupest;

  if (options.verbose) {
    stdout.info('find', 'COMMAND');
  }

  try {
    if (!page) {
      throw new Error('Unable to find the page.');
    }

    await page.waitForSelector(selector, { visible: true });
  } catch (err: any) {
    throw new FailException(err?.message, 'find', [selector]);
  }
}
