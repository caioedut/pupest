import { execSync } from 'child_process';
import pmex, { args } from 'pmex';

pmex('test');

pmex('build');

if (!args()['no-version']) {
  pmex('npm version patch');
  execSync('git push', { stdio: 'inherit' });
}

execSync('npm publish', { stdio: 'inherit' });
