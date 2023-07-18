import { Pupest } from '../index';
import stdout from '../stdout';
import FailException from '../exceptions/FailException';

export default async function select(selector: string, ...values: string[]) {
  // @ts-expect-error
  const { page, options } = this as Pupest;

  if (options.verbose) {
    stdout.info('select', 'COMMAND');
  }

  try {
    if (!page) {
      throw new Error('Unable to find the page.');
    }

    await page.waitForSelector(selector);
    await page.select(selector, ...values);
  } catch (err: any) {
    throw new FailException(err?.message, 'select', [selector, ...values]);
  }
}
