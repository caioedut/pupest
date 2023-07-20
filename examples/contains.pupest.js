import pupest from '../src';

pupest() //
  .go('https://www.npmjs.com/package/pupest')
  .contains('pupest')
  .test('[contains] NPM website must contain the word "pupest"');
