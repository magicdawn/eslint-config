import { sxzz } from "@sxzz/eslint-config";
import { Linter } from "eslint";
export * from "@sxzz/eslint-config";

//#region src/from-sxzz.d.ts
type SxzzArgs = Parameters<typeof sxzz>;
type SxzzOptions = SxzzArgs[0];
type Rest<T extends any[]> = T extends [any?, ...infer B] ? B : [];
type UserConfig = Rest<SxzzArgs>[number];
type SortImportOptions = {
  internalPattern?: string[];
  groups?: string[];
};
interface MixedOptions extends Exclude<SxzzOptions, undefined> {
  sortImport?: SortImportOptions;
}
declare function fromSxzz(options?: MixedOptions, ...moreConfigs: UserConfig[]): ReturnType<typeof sxzz>;
type GetRuleOptions<T extends Linter.RuleEntry> = T extends Linter.RuleSeverityAndOptions<infer Options> ? Options : never;
//#endregion
//#region src/mg-custom/index.d.ts
declare const mgCustomIgnoreConfig: Linter.Config;
declare const mgCustomRules: {
  readonly eslintCore: {
    readonly 'prefer-arrow-callback': "off";
    readonly 'no-constant-condition': "off";
    readonly 'no-void': "off";
    readonly 'no-restricted-syntax': "off";
    readonly 'no-console': "off";
    readonly 'no-duplicate-imports': "off";
    readonly 'prefer-const': ["warn", {
      readonly destructuring: "all";
    }];
    readonly 'array-callback-return': "off";
    readonly 'no-useless-assignment': "off";
    readonly 'no-lonely-if': "off";
  };
  readonly special__typeImport: {
    readonly 'no-duplicate-imports': "off";
    readonly '@typescript-eslint/consistent-type-imports': ["warn", {
      readonly fixStyle: "inline-type-imports";
    }];
  };
  readonly unicorn: {
    readonly 'unicorn/prefer-global-this': "off";
    readonly 'unicorn/no-useless-undefined': "off";
    readonly 'unicorn/prefer-iterator-to-array-at-end': "off";
    readonly 'unicorn/no-array-from-fill': "off";
    readonly 'unicorn/no-unnecessary-nested-ternary': "off";
    readonly 'unicorn/prefer-array-flat-map': "off";
    readonly 'unicorn/prefer-array-index-of': "off";
    readonly 'unicorn/prefer-array-some': "off";
    readonly 'unicorn/no-array-reduce': "off";
    readonly 'unicorn/prefer-string-trim-start-end': "off";
    readonly 'unicorn/prefer-string-raw': "off";
    readonly 'unicorn/prefer-query-selector': "off";
    readonly 'unicorn/prefer-dom-node-append': "off";
    readonly 'unicorn/prefer-dom-node-dataset': "off";
    readonly 'unicorn/prefer-add-event-listener': "off";
    readonly 'unicorn/prefer-single-call': "off";
    readonly 'unicorn/prefer-reflect-apply': "off";
    readonly 'unicorn/prefer-modern-dom-apis': "off";
    readonly 'unicorn/catch-error-name': "off";
    readonly 'unicorn/consistent-function-scoping': "off";
    readonly 'unicorn/filename-case': "off";
    readonly 'unicorn/no-negated-condition': "off";
    readonly 'unicorn/prefer-default-parameters': "off";
    readonly 'unicorn/no-array-sort': "off";
    readonly 'unicorn/no-array-reverse': "off";
  };
  readonly disableMorePrefer: {
    readonly 'prefer-template': "off";
  };
  readonly tseslint: {
    readonly '@typescript-eslint/ban-ts-comment': "off";
    readonly '@typescript-eslint/no-unused-vars': "off";
    readonly '@typescript-eslint/no-non-null-assertion': "off";
    readonly '@typescript-eslint/no-explicit-any': "off";
    readonly '@typescript-eslint/no-namespace': "off";
    readonly '@typescript-eslint/no-unused-expressions': "off";
    readonly '@typescript-eslint/prefer-literal-enum-member': "off";
    readonly '@typescript-eslint/no-this-alias': "off";
  };
  readonly import: {
    readonly 'import/no-mutable-exports': "off";
    readonly 'import/no-default-export': "off";
    readonly 'unused-imports/no-unused-imports': "warn";
    readonly 'unused-imports/no-unused-vars': "off";
  };
  readonly dts: {
    readonly 'no-var': "off";
    readonly 'vars-on-top': "off";
  };
};
//#endregion
export { GetRuleOptions, fromSxzz, mgCustomIgnoreConfig, mgCustomRules };