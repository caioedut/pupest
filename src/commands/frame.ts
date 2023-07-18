import { Pupest } from '../index';
import stdout from '../stdout';
import FailException from '../exceptions/FailException';

export default async function frame(selector?: string | null) {
  // @ts-expect-error
  const { scope, page, options } = this as Pupest;

  if (options.verbose) {
    stdout.info('frame', 'COMMAND');
  }

  try {
    if (!scope || !page) {
      throw new Error('Unable to find the page.');
    }

    if (!selector) {
      // @ts-expect-error
      this.scope = await page.mainFrame();
    }

    if (selector) {
      await scope.waitForSelector(selector);

      const $frame = await scope.$(selector);

      // @ts-expect-error
      this.scope = await $frame?.contentFrame();
    }
  } catch (err: any) {
    throw new FailException(err?.message, 'frame', [selector]);
  }
}
