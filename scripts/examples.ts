import pmex from 'pmex';
import { rmSync } from 'fs';

rmSync('node_modules/pupest', {
  recursive: true,
  force: true,
});

pmex(`build`);

pmex({
  npm: `install && npm prune`,
  pnpm: `install --fix-lockfile`,
  yarn: `install --check-files`,
});

pmex(`tsx src/cli.ts --visible --verbose`);
