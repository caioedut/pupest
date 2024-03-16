import type { Pupest } from '../index';

import FailException from '../exceptions/FailException';
import stdout from '../stdout';

export default async function waitAnimationEnd(selector = 'body') {
  // @ts-expect-error
  const { options, scope } = this as Pupest;

  if (options.verbose) {
    stdout.info('waitAnimationEnd', 'COMMAND');
  }

  try {
    if (!scope) {
      throw new Error('Unable to find the page.');
    }

    await scope.$eval(selector, ($el) => {
      return new Promise((resolve) => {
        let done = false;

        const handler = () => {
          if (done) return;
          done = true;
          resolve(true);
        };

        $el.addEventListener('animationend', handler, { once: true });
        $el.addEventListener('transitionend', handler, { once: true });
      });
    });
  } catch (err: any) {
    throw new FailException(err?.message, 'waitAnimationEnd', [selector]);
  }
}
