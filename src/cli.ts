#!/usr/bin/env node

import { execSync } from 'child_process';
import { globSync } from 'glob';
import { normalize } from 'path';

import args from './args';

console.clear();

const argPattern = args?._?.[2];
let pattern = argPattern ?? '**/*';

const exts = ['js', 'cjs', 'mjs', 'jsx', 'ts', 'tsx'];

if (!exts.some((ext) => pattern.endsWith(`.pupest.${ext}`))) {
  pattern += `.pupest.{${exts.join(',')}}`;
}

let files = globSync(pattern, { ignore: 'node_modules/**' }).sort();

if (args.changed) {
  const changedFiles = execSync('git diff --name-only').toString().split('\n');
  files = files.filter((item) => changedFiles.some((changed) => normalize(changed) === normalize(item)));
}

const forwardArgs = process.argv
  .slice(2)
  .filter((arg) => arg !== argPattern)
  .join(' ');

for (const file of files) {
  execSync(`tsx ${file} ${forwardArgs}`, { encoding: 'utf-8', stdio: 'inherit' });
}
