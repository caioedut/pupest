import { Pupest } from '../index';
import FailException from '../exceptions/FailException';
import stdout from '../stdout';

export default async function contains(text: string) {
  // @ts-expect-error
  const { page, options } = this as Required<Pupest>;

  if (options.verbose) {
    stdout.info('contains', 'COMMAND');
  }

  const test = await page.evaluate((text: string) => document.body.innerText.includes(text), text);

  if (!test) {
    throw new FailException(`Text not found`, 'contains', [text]);
  }
}
