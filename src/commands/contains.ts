import type { Pupest } from '../index';

import FailException from '../exceptions/FailException';
import stdout from '../stdout';

export default async function contains(text: string, selector?: string) {
  // @ts-expect-error
  const { options, scope } = this as Pupest;

  if (options.verbose) {
    stdout.info('contains', 'COMMAND');
  }

  try {
    if (!scope) {
      throw new Error('Unable to find the page.');
    }

    if (selector) {
      await scope.waitForSelector(selector);
    }

    const test = await scope.evaluate(
      (text: string, selector?: string) => {
        const $el = selector ? document.querySelector(selector) : document.body;
        // @ts-expect-error
        return $el ? $el.innerText.includes(text) : false;
      },
      text,
      selector,
    );

    if (!test) {
      throw new Error(`Text not found`);
    }
  } catch (err: any) {
    throw new FailException(err?.message, 'contains', [text, selector]);
  }
}
