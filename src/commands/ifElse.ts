import type { Browser, Frame, Page } from 'puppeteer';

import type { Pupest } from '../index';

import FailException from '../exceptions/FailException';
import stdout from '../stdout';

export default async function ifElse(
  condition: ((params: { browser: Browser; page: Page; scope: Frame }) => boolean | Promise<boolean>) | boolean,
  thenX: (params: { browser: Browser; page: Page; scope: Frame }) => Promise<void> | void,
  elseX?: (params: { browser: Browser; page: Page; scope: Frame }) => Promise<void> | void,
) {
  // @ts-expect-error
  const { browser, options, page, scope } = this as Pupest;

  if (options.verbose) {
    stdout.info('if', 'COMMAND');
  }

  try {
    if (!browser || !page || !scope) {
      throw new Error('Unable to find the page.');
    }

    const params = { browser, page, scope };
    const isTrue = condition instanceof Function ? await condition(params) : condition;

    if (isTrue) {
      await thenX?.(params);
    } else {
      await elseX?.(params);
    }
  } catch (err: any) {
    throw new FailException(err?.message, 'if', []);
  }
}
