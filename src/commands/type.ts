import { Pupest } from '../index';
import stdout from '../stdout';
import FailException from '../exceptions/FailException';

export default async function type(text: string, selector?: string) {
  // @ts-expect-error
  const { scope, page, options } = this as Pupest;

  if (options.verbose) {
    stdout.info('type', 'COMMAND');
  }

  try {
    if (!scope || !page) {
      throw new Error('Unable to find the page.');
    }

    if (typeof selector === 'string') {
      await scope.waitForSelector(selector);
      await scope.type(selector, text);
    } else {
      await page.keyboard.type(text);
    }
  } catch (err: any) {
    throw new FailException(err?.message, 'type', [text, selector]);
  }
}
