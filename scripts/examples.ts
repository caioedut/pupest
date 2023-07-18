import pmex from 'pmex';

pmex({
  npm: `install && npm prune`,
  pnpm: `install --fix-lockfile`,
  yarn: `install --check-files`,
});

pmex(`tsx src/cli.ts --visible --verbose`);
