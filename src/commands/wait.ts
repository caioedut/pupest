import stdout from '../stdout';
import { Pupest } from '../index';

export default async function wait(milliseconds: number) {
  // @ts-expect-error
  const { options } = this as Required<Pupest>;

  if (options.verbose) {
    stdout.info('wait', 'COMMAND');
  }

  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}
