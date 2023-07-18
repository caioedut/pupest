import { Pupest } from '../index';
import stdout from '../stdout';
import FailException from '../exceptions/FailException';

export default async function frame(selector?: string | null) {
  // @ts-expect-error
  const { page, options } = this as Pupest;

  if (options.verbose) {
    stdout.info('frame', 'COMMAND');
  }

  try {
    if (!page) {
      throw new Error('Unable to find the page.');
    }

    // @ts-expect-error
    this.scope = await page.mainFrame();

    if (selector) {
      await page.waitForSelector(selector);

      const $frame = await page.$(selector);
      // @ts-expect-error
      this.scope = await $frame?.contentFrame();
    }
  } catch (err: any) {
    throw new FailException(err?.message, 'frame', [selector]);
  }
}
