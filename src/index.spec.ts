import { Base } from '@dword-design/base';
import { test } from '@playwright/test';
import endent from 'endent';
import outputFiles from 'output-files';

test('destructuring pattern', async ({}, testInfo) => {
  const cwd = testInfo.outputPath();

  await outputFiles(cwd, {
    'package.json': JSON.stringify({
      peerDependencies: { '@playwright/test': '*' },
    }),
    'src/index.ts': endent`
      import { test as base } from '@playwright/test';

      export const test = base.extend<{ foo: string }>({
        foo: ({}, use) => use('bar'),
      });
    `,
  });

  const base = new Base('../../src', { cwd });
  await base.prepare();
  await base.lint();
});
