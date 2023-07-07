import pupest from 'pupest';

pupest() //
  .go('https://github.com/')
  .contains('git')
  .test('GitHub website must contain the word "git"');
