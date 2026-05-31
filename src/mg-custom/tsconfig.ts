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
  | 'strictBuiltinIteratorReturn'
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

        // typecheck:strict:related
        'strict',
        'alwaysStrict',
        'strictNullChecks',
        'strictBindCallApply',
        'strictBuiltinIteratorReturn',
        'strictFunctionTypes',
        'strictPropertyInitialization',
        'noImplicitAny',
        'noImplicitOverride', // not strict related, but common used by me
        'noImplicitThis',
        'useUnknownInCatchVariables',

        // typecheck:more
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
