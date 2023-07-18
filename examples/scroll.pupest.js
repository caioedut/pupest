import pupest from 'pupest';

pupest() //
  .go('https://www.npmjs.com/package/pupest')
  .scroll('[href="/policies/privacy"]')
  .test('Scroll into footer');
