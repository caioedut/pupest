import pupest, { Pupest } from '../src';

/**
 * @param {import("pupest").Pupest} pupest
 * @param {string} packageName
 * @returns {import("pupest").Pupest}
 */
function goToNpm(pupest, packageName) {
  return pupest.go(`https://www.npmjs.com/package/${packageName}`);
}

pupest() //
  .command(goToNpm, 'pupest')
  .test('[command] Go to NPM');
