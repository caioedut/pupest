import pupest from 'pupest';

pupest() //
  .go('https://www.npmjs.com/package/pupest')
  .screenshot()
  .test('Screenshot');
