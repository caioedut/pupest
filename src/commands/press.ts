import type { KeyInput } from 'puppeteer';

import type { Pupest } from '../index';

import FailException from '../exceptions/FailException';
import stdout from '../stdout';

export default async function press(key: KeyInput) {
  // @ts-expect-error
  const { options, page } = this as Pupest;

  if (options.verbose) {
    stdout.info('press', 'COMMAND');
  }

  try {
    if (!page) {
      throw new Error('Unable to find the page.');
    }

    await page.keyboard.press(key);
  } catch (err: any) {
    throw new FailException(err?.message, 'press', [key]);
  }
}
