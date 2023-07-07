import { Pupest } from '../index';
import stdout from '../stdout';

export default async function go(url: string) {
  // @ts-expect-error
  const { page, options } = this as Required<Pupest>;

  if (options.verbose) {
    stdout.info('go', 'COMMAND');
  }

  await page.goto(url, { waitUntil: 'networkidle2' });
}
