#!/usr/bin/env node

import { execSync } from 'child_process';
import { globSync } from 'glob';
import { normalize } from 'path';

import args from './args';

console.clear();

let pattern = args?._?.[2] ?? '**/*';

if (!pattern.endsWith('.pupest.js')) {
  pattern += '.pupest.js';
}

let files = globSync(pattern, { ignore: 'node_modules/**' }).sort();

if (args.changed) {
  const changedFiles = execSync('git diff --name-only').toString().split('\n');
  files = files.filter((item) => changedFiles.some((changed) => normalize(changed) === normalize(item)));
}

const forwardArgs = process.argv.filter((arg) => arg.startsWith('-')).join(' ');

for (const file of files) {
  execSync(`tsx ${file} ${forwardArgs}`, { encoding: 'utf-8', stdio: 'inherit' });
}
