import type { Pupest } from '../index';

import FailException from '../exceptions/FailException';
import stdout from '../stdout';

export default async function type(text: string, selector?: string) {
  // @ts-expect-error
  const { options, page, scope } = this as Pupest;

  if (options.verbose) {
    stdout.info('type', 'COMMAND');
  }

  try {
    if (!scope || !page) {
      throw new Error('Unable to find the page.');
    }

    if (typeof selector === 'string') {
      await scope.waitForSelector(selector);

      await page.focus(selector);

      // Clear with CTRL
      await page.keyboard.down('Control');
      await page.keyboard.press('A');
      await page.keyboard.up('Control');
      await page.keyboard.press('Backspace');

      // Clear with CMD
      await page.keyboard.down('Meta');
      await page.keyboard.press('A');
      await page.keyboard.up('Meta');
      await page.keyboard.press('Backspace');

      await scope.type(selector, text);
    } else {
      await page.keyboard.type(text);
    }
  } catch (err: any) {
    throw new FailException(err?.message, 'type', [text, selector]);
  }
}
