import pupest from '../src';

pupest() //
  .go('https://github.com/login')
  .type('pupest', '#login_field')
  .wait(100)
  .test('[type] Go to GitHub login and type "pupest"');
