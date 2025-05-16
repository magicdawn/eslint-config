import { GLOB_SRC, GLOB_TS, GLOB_TSX, sxzz } from '@sxzz/eslint-config'
import { uniq } from 'es-toolkit'
import eslintConfigPrettier from 'eslint-config-prettier'
import { mgCustomIgnoreConfig, mgCustomJsonOrder, mgCustomRules } from '../mg-custom'

export function fromSxzz(...args: Parameters<typeof sxzz>) {
  const [moreOptions, ...moreConfigs] = args
  return (
    sxzz(
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
      .remove('sxzz/node') // not useful
      .remove('sxzz/de-morgan') // NO, I hate this
      .remove('sxzz/markdown/recommended/processor')
      .removeRules('sxzz/prefer-string-function')

      // replace tsconfig order with mgCustom
      .override('sxzz/sort/tsconfig', (config) => {
        const val = config.rules?.['jsonc/sort-keys']
        if (val && Array.isArray(val) && val.length > 0) {
          const ruleOptions = val.slice(1) as Array<{ pathPattern: string; order: string[] }>
          const targets = mgCustomJsonOrder.tsconfig
          for (const target of targets) {
            const ruleOption = ruleOptions.find((x) => x.pathPattern === target.pathPattern)
            if (ruleOption) ruleOption.order = uniq([...target.order, ...ruleOption.order])
          }
        }

        return config
      })
  )
}
