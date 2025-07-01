import type { Linter } from 'eslint'

export const mgCustomIgnoreConfig: Linter.Config = {
  name: 'mg/custom-ignore',
  ignores: [
    'dist/',
    '**/*.module.{css,less,scss}.d.ts', // generated
  ],
}

export const mgCustomRules = {
  eslintCore: {
    'prefer-arrow-callback': 'off',
    'no-constant-condition': 'off',
    'no-void': 'off',
    'no-restricted-syntax': 'off',
    'no-console': 'off',
    'no-duplicate-imports': 'off',
    'prefer-const': ['warn', { destructuring: 'all' }],
    'array-callback-return': 'off', // this rule is useful, but current habit don't use it. Enable after it cause a serious bug
  },

  // import {type X} from 'x'
  special__typeImport: {
    'no-duplicate-imports': 'off',
    '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
  },

  unicorn: {
    'unicorn/catch-error-name': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/filename-case': 'off',
    // I don't prefer, I know what I'm doing ~
    'unicorn/prefer-array-flat-map': 'off',
    'unicorn/prefer-array-index-of': 'off',
    'unicorn/prefer-array-some': 'off',
    'unicorn/prefer-single-call': 'off',
    'unicorn/prefer-reflect-apply': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prefer-dom-node-append': 'off',
    'unicorn/prefer-dom-node-dataset': 'off',
    'unicorn/prefer-modern-dom-apis': 'off', // insertAdjacentElement is so nice & intuitive, but U prefer other !!!
    'unicorn/prefer-add-event-listener': 'off',
    'unicorn/prefer-string-trim-start-end': 'off',
  },

  disableMorePrefer: {
    'prefer-template': 'off',
  },

  tseslint: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/prefer-literal-enum-member': 'off',
    '@typescript-eslint/no-this-alias': 'off', // 我也不想用啊, 有时候确实需要
  },

  import: {
    'import/no-mutable-exports': 'off',
    'import/no-default-export': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': 'off',
  },

  dts: {
    // dts: global augmentation use `var`
    'no-var': 'off',
    'vars-on-top': 'off',
  },
} as const satisfies Record<string, Linter.RulesRecord>

export type TsConfigCompilerOptionsKey =
  /* Projects */
  | 'incremental'
  | 'composite'
  | 'tsBuildInfoFile'
  | 'disableSourceOfProjectReferenceRedirect'
  | 'disableSolutionSearching'
  | 'disableReferencedProjectLoad'
  /* Language and Environment */
  | 'target'
  | 'jsx'
  | 'jsxFactory'
  | 'jsxFragmentFactory'
  | 'jsxImportSource'
  | 'lib'
  | 'moduleDetection'
  | 'noLib'
  | 'reactNamespace'
  | 'useDefineForClassFields'
  | 'emitDecoratorMetadata'
  | 'experimentalDecorators'
  /* Modules */
  | 'baseUrl'
  | 'rootDir'
  | 'rootDirs'
  | 'customConditions'
  | 'module'
  | 'moduleResolution'
  | 'moduleSuffixes'
  | 'noResolve'
  | 'paths'
  | 'resolveJsonModule'
  | 'resolvePackageJsonExports'
  | 'resolvePackageJsonImports'
  | 'typeRoots'
  | 'types'
  | 'allowArbitraryExtensions'
  | 'allowImportingTsExtensions'
  | 'allowUmdGlobalAccess'
  /* JavaScript Support */
  | 'allowJs'
  | 'checkJs'
  | 'maxNodeModuleJsDepth'
  /* Type Checking */
  | 'strict'
  | 'strictBindCallApply'
  | 'strictFunctionTypes'
  | 'strictNullChecks'
  | 'strictPropertyInitialization'
  | 'allowUnreachableCode'
  | 'allowUnusedLabels'
  | 'alwaysStrict'
  | 'exactOptionalPropertyTypes'
  | 'noFallthroughCasesInSwitch'
  | 'noImplicitAny'
  | 'noImplicitOverride'
  | 'noImplicitReturns'
  | 'noImplicitThis'
  | 'noPropertyAccessFromIndexSignature'
  | 'noUncheckedIndexedAccess'
  | 'noUnusedLocals'
  | 'noUnusedParameters'
  | 'useUnknownInCatchVariables'
  /* Emit */
  | 'declaration'
  | 'declarationDir'
  | 'declarationMap'
  | 'downlevelIteration'
  | 'emitBOM'
  | 'emitDeclarationOnly'
  | 'importHelpers'
  | 'importsNotUsedAsValues'
  | 'inlineSourceMap'
  | 'inlineSources'
  | 'isolatedDeclarations'
  | 'mapRoot'
  | 'newLine'
  | 'noEmit'
  | 'noEmitHelpers'
  | 'noEmitOnError'
  | 'outDir'
  | 'outFile'
  | 'preserveConstEnums'
  | 'preserveValueImports'
  | 'removeComments'
  | 'sourceMap'
  | 'sourceRoot'
  | 'stripInternal'
  /* Interop Constraints */
  | 'allowSyntheticDefaultImports'
  | 'esModuleInterop'
  | 'forceConsistentCasingInFileNames'
  | 'isolatedModules'
  | 'preserveSymlinks'
  | 'verbatimModuleSyntax'
  /* Completeness */
  | 'skipDefaultLibCheck'
  | 'skipLibCheck'

// https://www.typescriptlang.org/tsconfig/
export const mgCustomJsonOrder = {
  tsconfig: [
    {
      path: 'top-level',
      pathPattern: '^$',
      order: [
        // basic config
        'extends',
        'files',
        'include',
        'exclude',
        'references',

        // complex
        'compilerOptions',

        // rarely used
        'watchOptions',
        'typeAcquisition',
      ],
    },

    {
      path: 'compilerOptions',
      pathPattern: '^compilerOptions$',
      order: [
        // important things first
        'tsBuildInfoFile',
        'composite',
        'rootDir',
        'outDir',
        'baseUrl',
        'paths',

        // module
        'target',
        'lib',
        'module',
        'moduleResolution',
        'moduleDetection',
        'esModuleInterop',
        'allowSyntheticDefaultImports',
        'isolatedModules', // vite mandatory

        // type check
        'strict',
        'noImplicitOverride',
        'skipLibCheck',
        'types',

        // jsx
        'jsx',
        'jsxFactory',
        'jsxFragmentFactory',
        'jsxImportSource',
      ] satisfies TsConfigCompilerOptionsKey[],
    },
  ],
}
