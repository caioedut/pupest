import { Pupest } from '../index';
import { KeyInput } from 'puppeteer';
import stdout from '../stdout';

export default async function press(key: KeyInput) {
  // @ts-expect-error
  const { page, options } = this as Required<Pupest>;

  if (options.verbose) {
    stdout.info('press', 'COMMAND');
  }

  await page.keyboard.press(key);
}
