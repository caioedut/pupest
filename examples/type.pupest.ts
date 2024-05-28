import pupest from '../src';

pupest() //
  .go('https://github.com/login')
  .type('pupest', '#login_field')
  .test('[type] Go to GitHub login and type "pupest"');
