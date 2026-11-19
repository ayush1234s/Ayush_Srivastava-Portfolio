import { spawnSync } from 'node:child_process';
import { cp, mkdir, rm } from 'node:fs/promises';

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

for (const app of ['client', 'admin']) {
  const result = spawnSync(npm, ['run', 'build'], {
    cwd: new URL(`../${app}/`, import.meta.url),
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

await rm(new URL('../hosting/', import.meta.url), { recursive: true, force: true });
await mkdir(new URL('../hosting/admin/', import.meta.url), { recursive: true });
await cp(new URL('../client/dist/', import.meta.url), new URL('../hosting/', import.meta.url), { recursive: true });
await cp(new URL('../admin/dist/', import.meta.url), new URL('../hosting/admin/', import.meta.url), { recursive: true });
