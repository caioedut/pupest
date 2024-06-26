import pmex, { args } from 'pmex';

pmex({
  bun: 'install',
  npm: 'install && npm prune',
  pnpm: 'install --fix-lockfile',
  yarn: 'install --check-files',
});

pmex(`tsx src/cli.ts ${args().$}`);
