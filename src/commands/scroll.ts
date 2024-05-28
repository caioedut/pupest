import type { Pupest } from '../index';

import FailException from '../exceptions/FailException';
import stdout from '../stdout';

export default async function scroll(selector: string) {
  // @ts-expect-error
  const { options, scope } = this as Pupest;

  if (options.verbose) {
    stdout.info('scroll', 'COMMAND');
  }

  try {
    if (!scope) {
      throw new Error('Unable to find the page.');
    }

    await scope.waitForSelector(selector);

    await scope.evaluate(async (selector) => {
      const $el = document.querySelector(selector);

      if ($el) {
        $el.scrollIntoView({ behavior: 'instant' });

        await new Promise((resolve) => {
          document.addEventListener('scrollend', resolve, { once: true });
        });
      }
    }, selector);
  } catch (err: any) {
    throw new FailException(err?.message, 'scroll', [selector]);
  }
}
