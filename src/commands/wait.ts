import FailException from '../exceptions/FailException';
import { Pupest } from '../index';
import stdout from '../stdout';

export default async function wait(milliseconds: number) {
  // @ts-expect-error
  const { options, scope } = this as Pupest;

  if (options.verbose) {
    stdout.info('wait', 'COMMAND');
  }

  try {
    if (!scope) {
      throw new Error('Unable to find the page.');
    }

    await new Promise((resolve) => setTimeout(resolve, milliseconds));
  } catch (err: any) {
    throw new FailException(err?.message, 'wait', [milliseconds]);
  }
}
