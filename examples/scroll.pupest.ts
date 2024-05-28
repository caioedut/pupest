import pupest from '../src';

pupest() //
  .go('https://www.npmjs.com/package/pupest')
  .scroll('[href="/policies/privacy"]')
  .test('[scroll] Scroll into footer');
