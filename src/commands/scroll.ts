import { Pupest } from '../index';
import stdout from '../stdout';
import FailException from '../exceptions/FailException';

export default async function scroll(selector: string) {
  // @ts-expect-error
  const { page, options } = this as Pupest;

  if (options.verbose) {
    stdout.info('scroll', 'COMMAND');
  }

  try {
    if (!page) {
      throw new Error('Unable to find the page.');
    }

    await page.waitForSelector(selector);

    await page.evaluate((selector) => {
      const $el = document.querySelector(selector);
      $el && $el.scrollIntoView(true);
    }, selector);
  } catch (err: any) {
    throw new FailException(err?.message, 'scroll', [selector]);
  }
}
