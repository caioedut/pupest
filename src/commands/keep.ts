import FailException from '../exceptions/FailException';
import { Pupest } from '../index';
import stdout from '../stdout';

export default async function keep(selector: string) {
  // @ts-expect-error
  const { options, scope } = this as Pupest;

  if (options.verbose) {
    stdout.info('keep', 'COMMAND');
  }

  try {
    if (!scope) {
      throw new Error('Unable to find the page.');
    }

    // @ts-expect-error
    this.options.keep = true;
  } catch (err: any) {
    throw new FailException(err?.message, 'keep', [selector]);
  }
}
