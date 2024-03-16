import type { Pupest } from '../index';

import FailException from '../exceptions/FailException';
import stdout from '../stdout';

export default async function waitResponseURL(
  url: string,
  method?: 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE',
) {
  // @ts-expect-error
  const { options, page, scope } = this as Pupest;

  if (options.verbose) {
    stdout.info('waitResponseURL', 'COMMAND');
  }

  try {
    if (!page) {
      throw new Error('Unable to find the page.');
    }

    await page.waitForResponse((response) => {
      const reqMethod = response.request().method().toUpperCase();
      const matchMethod = method ? reqMethod === method.toUpperCase() : reqMethod !== 'OPTIONS';

      const responseURL = response.url();
      const checkURL = url.replace(/^\*/, '').replace(/\*$/, '');

      let matchURL = responseURL === checkURL;

      if (url.startsWith('*') && url.endsWith('*')) {
        matchURL = responseURL.includes(checkURL);
      } else if (url.startsWith('*')) {
        matchURL = responseURL.endsWith(checkURL);
      } else if (url.endsWith('*')) {
        matchURL = responseURL.startsWith(checkURL);
      }

      return matchURL && matchMethod;
    });
  } catch (err: any) {
    throw new FailException(err?.message, 'waitResponseURL', [url, method]);
  }
}
