import pupest from '../src';

pupest() //
  .go('https://www.npmjs.com/package/pupest')
  .contains('pupest')
  .test('NPM website must contain the word "pupest"');
