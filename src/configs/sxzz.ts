import { GLOB_SRC, GLOB_TS, GLOB_TSX, sxzz } from '@sxzz/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'
import { mgCustomIgnoreConfig, mgCustomRules } from '../mg-custom'

export function fromSxzz(...args: Parameters<typeof sxzz>) {
  const [moreOptions, ...moreConfigs] = args
  return sxzz(
    { command: false, prettier: false, ...(moreOptions ?? {}) },
    [
      eslintConfigPrettier,
      mgCustomIgnoreConfig,
      {
        name: 'mg/custom-rules',
        files: [GLOB_SRC],
        rules: {
          ...mgCustomRules.unicorn,
          ...mgCustomRules.import,
          ...mgCustomRules.eslintCore,
        },
      },
      {
        name: 'mg/custom-rules/ts',
        files: [GLOB_TS, GLOB_TSX],
        rules: {
          ...mgCustomRules.tseslint,
          ...mgCustomRules.special__typeImport,
        },
      },
    ],
    ...(moreConfigs ?? []),
  )
    .remove('sxzz/node') // I don't see any useful rule in this plugin
    .remove('sxzz/markdown/recommended/processor')
    .removeRules('sxzz/prefer-string-function')
}
