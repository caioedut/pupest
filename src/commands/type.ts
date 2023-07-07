import { Pupest } from '../index';
import stdout from '../stdout';

export default async function type(text: string, selector?: string) {
  // @ts-expect-error
  const { page, options } = this as Required<Pupest>;

  if (options.verbose) {
    stdout.info('type', 'COMMAND');
  }

  if (typeof selector === 'string') {
    await page.type(selector, text);
  } else {
    await page.keyboard.type(text);
  }
}
