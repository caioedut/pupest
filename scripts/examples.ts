import pmex from 'pmex';

pmex({
  npm: `install && npm prune`,
  pnpm: `install --fix-lockfile`,
  yarn: `install --check-files`,
});

pmex(`tsx src/cli.ts ${process.argv.slice(2).join(' ')}`);
