import pupest from '../src';

pupest() //
  .go('https://www.npmjs.com/package/pupest')
  .scroll('[href="/policies/privacy"]')
  .wait(100)
  .test('[scroll] Scroll into footer');
