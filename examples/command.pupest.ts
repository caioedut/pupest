import pupest, { Pupest } from '../src';

function goToNpm(pupest: Pupest, packageName: string) {
  return pupest.go(`https://www.npmjs.com/package/${packageName}`);
}

pupest() //
  .command(goToNpm, 'pupest')
  .test('[command] Go to NPM');
