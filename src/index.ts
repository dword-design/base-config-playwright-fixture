import { type Base, defineBaseConfig } from '@dword-design/base';
import getNodeConfig from '@dword-design/base-config-node';
import endent from 'endent';

export default defineBaseConfig(function (this: Base) {
  return {
    ...getNodeConfig.call(this),
    eslintConfig: endent`
      import config from '@dword-design/eslint-config';
      import { defineConfig, globalIgnores } from 'eslint/config';

      export default defineConfig([
        globalIgnores(['eslint.config.ts', 'eslint.lint-staged.config.ts']),
        config,
        { rules: { 'no-empty-pattern': 'off' } },
      ]);\n
    `,
  };
});
