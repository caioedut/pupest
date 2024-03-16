import pmex from 'pmex';

const args = process.argv.slice(2);

pmex({
  npm: `install && npm prune`,
  pnpm: `install --fix-lockfile`,
  yarn: `install --check-files`,
});

pmex(`tsx src/cli.ts ${args.join(' ')}`);
