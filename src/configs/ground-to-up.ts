import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import { mgCustomIgnoreConfig, mgCustomRules } from '../mg-custom'
import type { Linter } from 'eslint'

export const groundToUpConfigs: Linter.Config[] = [
  eslint.configs.recommended,
  tseslint.configs.recommended as any,
  eslintConfigPrettier,
  mgCustomIgnoreConfig,
  {
    rules: {
      ...mgCustomRules.eslintCore,
      ...mgCustomRules.tseslint,
      ...mgCustomRules.special__typeImport,
    },
  },
]
