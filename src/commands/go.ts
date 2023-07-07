import { Pupest } from '../index';
import stdout from '../stdout';
import FailException from '../exceptions/FailException';

export default async function go(url: string) {
  // @ts-expect-error
  const { page, options } = this as Pupest;

  if (options.verbose) {
    stdout.info('go', 'COMMAND');
  }

  try {
    if (!page) {
      throw new Error('Unable to find the page.');
    }

    await page.goto(url, { waitUntil: 'networkidle2' });
  } catch (err: any) {
    throw new FailException(err?.message, 'go', [url]);
  }
}
