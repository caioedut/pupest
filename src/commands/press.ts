import { Pupest } from '../index';
import { KeyInput } from 'puppeteer';
import stdout from '../stdout';
import FailException from '../exceptions/FailException';

export default async function press(key: KeyInput) {
  // @ts-expect-error
  const { page, options } = this as Pupest;

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
