import { Browser, Frame, Page } from 'puppeteer';

import FailException from '../exceptions/FailException';
import { Pupest } from '../index';
import stdout from '../stdout';

export default async function puppeteer(handler: (params: { browser: Browser; page: Page; scope: Frame }) => any) {
  // @ts-expect-error
  const { browser, options, page, scope } = this as Pupest;

  if (options.verbose) {
    stdout.info('puppeteer', 'COMMAND');
  }

  try {
    if (!browser || !page || !scope) {
      throw new Error('Unable to find the page.');
    }

    await handler({ browser, page, scope });
  } catch (err: any) {
    throw new FailException(err?.message, 'puppeteer', [handler]);
  }
}
