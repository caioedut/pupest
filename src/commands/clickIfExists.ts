import FailException from '../exceptions/FailException';
import { Pupest } from '../index';
import stdout from '../stdout';

export default async function clickIfExists(selector: string) {
  // @ts-expect-error
  const { options, scope } = this as Pupest;

  if (options.verbose) {
    stdout.info('clickIfExists', 'COMMAND');
  }

  try {
    if (!scope) {
      throw new Error('Unable to find the page.');
    }

    await scope.click(selector).catch(() => null);
  } catch (err: any) {
    throw new FailException(err?.message, 'clickIfExists', [selector]);
  }
}
