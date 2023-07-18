import pupest from 'pupest';

pupest() //
  .go('https://www.npmjs.com/package/pupest')
  .scroll('[href="/policies/privacy"]')
  .wait(100)
  .test('Scroll into footer');
