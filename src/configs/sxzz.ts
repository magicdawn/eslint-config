import { GLOB_SRC, GLOB_TS, GLOB_TSX, sxzz } from '@sxzz/eslint-config'
import { invariant, uniq } from 'es-toolkit'
import eslintConfigPrettier from 'eslint-config-prettier'
import { mgCustomIgnoreConfig, mgCustomJsonOrder, mgCustomRules } from '../mg-custom'
import type { Linter } from 'eslint'

type SxzzArgs = Parameters<typeof sxzz>
type SxzzOptions = SxzzArgs[0]
type Rest<T extends any[]> = T extends [any?, ...infer B] ? B : []
type UserConfig = Rest<SxzzArgs>[number]

type SortImportOptions = {
  internalPattern?: string[]
  groups?: string[]
}

interface MixedOptions extends Exclude<SxzzOptions, undefined> {
  sortImport?: SortImportOptions
}

export function fromSxzz(options?: MixedOptions, ...moreConfigs: UserConfig[]) {
  const { sortImport, ...sxzzOptions } = options ?? {}
  return (
    sxzz(
      { command: false, prettier: false, ...(sxzzOptions ?? {}) },
      [
        eslintConfigPrettier,
        mgCustomIgnoreConfig,
        {
          // apply to all files
          rules: {
            ...mgCustomRules.unicorn,
          },
        },
        {
          name: 'mg/custom-rules',
          files: [GLOB_SRC],
          rules: {
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
        {
          name: 'mg/custom-rules/dts',
          files: ['**/*.d.ts'],
          rules: { ...mgCustomRules.dts },
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

      // replace ts import order
      .override('sxzz/sort/imports', (config) => {
        // from options
        const { internalPattern, groups } = sortImport ?? {}

        const val = config.rules?.['perfectionist/sort-imports']
        if (val && Array.isArray(val) && val.length > 0) {
          const [severity, ...options] = val
          invariant(options.length === 1, 'options.length should be 1')
          // modify options
          options[0].internalPattern = uniq(['^[~@#$]/.*', String.raw`^\$.+`, ...(internalPattern ?? [])]) // add `$`
          options[0].groups = uniq([...(groups ?? []), 'side-effect-style', 'side-effect', ...options[0].groups])
        }
        return config
      })
  )
}

export type GetRuleOptions<T extends Linter.RuleEntry> =
  T extends Linter.RuleSeverityAndOptions<infer Options> ? Options : never
