#!/usr/bin/env node

import { execSync } from 'child_process';
import { globSync } from 'glob';

const args = process.argv.slice(2).join(' ');

const files = globSync('**/*.pupest.js', { ignore: 'node_modules/**' }).sort();

console.clear();

for (const file of files) {
  execSync(`tsx ${file} ${args}`, { stdio: 'inherit', encoding: 'utf-8' });
}
