import pmex from 'pmex';

pmex('tsc --build --force');

pmex('npm version patch');

pmex('npm publish');
