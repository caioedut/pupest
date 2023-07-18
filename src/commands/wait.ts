import stdout from '../stdout';
import { Pupest } from '../index';
import FailException from '../exceptions/FailException';

export default async function wait(milliseconds: number) {
  // @ts-expect-error
  const { scope, options } = this as Pupest;

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
