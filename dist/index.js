import assert from "node:assert/strict";
import { GLOB_SRC, GLOB_TS, GLOB_TSX, sxzz } from "@sxzz/eslint-config";
import { uniq } from "es-toolkit";
import eslintConfigPrettier from "eslint-config-prettier";
export * from "@sxzz/eslint-config";
//#region src/mg-custom/index.ts
const mgCustomIgnoreConfig = {
	name: "mg/custom-ignore",
	ignores: ["dist/", "**/*.module.{css,less,scss}.d.ts"]
};
const mgCustomRules = {
	eslintCore: {
		"prefer-arrow-callback": "off",
		"no-constant-condition": "off",
		"no-void": "off",
		"no-restricted-syntax": "off",
		"no-console": "off",
		"no-duplicate-imports": "off",
		"prefer-const": ["warn", { destructuring: "all" }],
		"array-callback-return": "off",
		"no-useless-assignment": "off",
		"no-lonely-if": "off"
	},
	special__typeImport: {
		"no-duplicate-imports": "off",
		"@typescript-eslint/consistent-type-imports": ["warn", { fixStyle: "inline-type-imports" }]
	},
	unicorn: {
		"unicorn/prefer-global-this": "off",
		"unicorn/no-useless-undefined": "off",
		"unicorn/prefer-iterator-to-array-at-end": "off",
		"unicorn/no-unused-array-method-return": "off",
		"unicorn/no-exports-in-scripts": "off",
		"unicorn/no-array-from-fill": "off",
		"unicorn/no-unnecessary-nested-ternary": "off",
		"unicorn/prefer-array-flat-map": "off",
		"unicorn/prefer-array-index-of": "off",
		"unicorn/prefer-array-some": "off",
		"unicorn/no-array-reduce": "off",
		"unicorn/prefer-string-trim-start-end": "off",
		"unicorn/prefer-string-raw": "off",
		"unicorn/prefer-query-selector": "off",
		"unicorn/prefer-dom-node-append": "off",
		"unicorn/prefer-dom-node-dataset": "off",
		"unicorn/prefer-add-event-listener": "off",
		"unicorn/prefer-single-call": "off",
		"unicorn/prefer-reflect-apply": "off",
		"unicorn/prefer-modern-dom-apis": "off",
		"unicorn/catch-error-name": "off",
		"unicorn/consistent-function-scoping": "off",
		"unicorn/filename-case": "off",
		"unicorn/no-negated-condition": "off",
		"unicorn/prefer-default-parameters": "off",
		"unicorn/no-array-sort": "off",
		"unicorn/no-array-reverse": "off"
	},
	disableMorePrefer: { "prefer-template": "off" },
	tseslint: {
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-unused-expressions": "off",
		"@typescript-eslint/prefer-literal-enum-member": "off",
		"@typescript-eslint/no-this-alias": "off"
	},
	import: {
		"import/no-mutable-exports": "off",
		"import/no-default-export": "off",
		"unused-imports/no-unused-imports": "warn",
		"unused-imports/no-unused-vars": "off"
	},
	dts: {
		"no-var": "off",
		"vars-on-top": "off"
	}
};
//#endregion
//#region src/mg-custom/perfection-list/sort-imports.ts
/**
* https://perfectionist.dev/rules/sort-imports#groups
*
* modifier & selector are terms of perfectionist
*/
/**
[
'type-import',
['value-builtin', 'value-external'],
'type-internal',
'value-internal',
['type-parent', 'type-sibling', 'type-index'],
['value-parent', 'value-sibling', 'value-index'],
'ts-equals-import',
'unknown',
]
*/
/**
https://github.com/sxzz/eslint-config/blob/main/src/configs/sort.ts
builtin',
'external',
'internal',
'parent',
'subpath',
'sibling',
'index',
'style',
'type',
'side-effect',
'side-effect-style',
*/
const generalOrder = [
	"builtin",
	"external",
	"tsconfig-path",
	"subpath",
	"internal",
	"parent",
	"index",
	"sibling"
];
function addModifier(modifier) {
	return generalOrder.map((x) => {
		if (typeof x === "string") return `${modifier}-${x}`;
		throw new Error("should not reach here");
	});
}
const customSortImportGroups = [
	"side-effect-style",
	"side-effect",
	...generalOrder,
	...addModifier("type")
];
//#endregion
//#region src/mg-custom/tsconfig.ts
const mgCustomJsonOrder = { tsconfig: [{
	path: "top-level",
	pathPattern: "^$",
	order: [
		"extends",
		"files",
		"include",
		"exclude",
		"references",
		"compilerOptions",
		"watchOptions",
		"typeAcquisition"
	]
}, {
	path: "compilerOptions",
	pathPattern: "^compilerOptions$",
	order: [
		"tsBuildInfoFile",
		"composite",
		"rootDir",
		"outDir",
		"baseUrl",
		"paths",
		"target",
		"lib",
		"module",
		"moduleResolution",
		"moduleDetection",
		"esModuleInterop",
		"allowSyntheticDefaultImports",
		"isolatedModules",
		"strict",
		"alwaysStrict",
		"strictNullChecks",
		"strictBindCallApply",
		"strictBuiltinIteratorReturn",
		"strictFunctionTypes",
		"strictPropertyInitialization",
		"noImplicitAny",
		"noImplicitOverride",
		"noImplicitThis",
		"useUnknownInCatchVariables",
		"skipLibCheck",
		"types",
		"jsx",
		"jsxFactory",
		"jsxFragmentFactory",
		"jsxImportSource"
	]
}] };
//#endregion
//#region src/from-sxzz.ts
function fromSxzz(options, ...moreConfigs) {
	const { sortImport, ...sxzzOptions } = options ?? {};
	return sxzz({
		command: false,
		prettier: false,
		...sxzzOptions
	}, [
		eslintConfigPrettier,
		mgCustomIgnoreConfig,
		{
			name: "mg/custom-rules/all-files",
			rules: {
				...mgCustomRules.unicorn,
				...mgCustomRules.disableMorePrefer
			}
		},
		{
			name: "mg/custom-rules/src-files",
			files: [GLOB_SRC],
			rules: {
				...mgCustomRules.import,
				...mgCustomRules.eslintCore
			}
		},
		{
			name: "mg/custom-rules/ts",
			files: [GLOB_TS, GLOB_TSX],
			rules: {
				...mgCustomRules.tseslint,
				...mgCustomRules.special__typeImport
			}
		},
		{
			name: "mg/custom-rules/dts",
			files: ["**/*.d.ts"],
			rules: { ...mgCustomRules.dts }
		}
	], ...moreConfigs ?? []).remove("sxzz/node").remove("sxzz/de-morgan").remove("sxzz/markdown/recommended/processor").remove("sxzz/comments/recommended").remove("sxzz/comments").removeRules("sxzz/prefer-string-function").override("sxzz/sort/tsconfig", (config) => {
		const val = config.rules?.["jsonc/sort-keys"];
		if (val && Array.isArray(val) && val.length > 0) {
			const ruleOptions = val.slice(1);
			const targets = mgCustomJsonOrder.tsconfig;
			for (const target of targets) {
				const ruleOption = ruleOptions.find((x) => x.pathPattern === target.pathPattern);
				if (ruleOption) ruleOption.order = uniq([...target.order, ...ruleOption.order]);
			}
		}
		return config;
	}).override("sxzz/sort/imports", (config) => {
		const { internalPattern, groups } = sortImport ?? {};
		const val = config.rules?.["perfectionist/sort-imports"];
		if (val && Array.isArray(val) && val.length > 0) {
			const [severity, ...options] = val;
			assert(options.length === 1, "options.length should be 1");
			assert(options[0], "options[0] should not be nil");
			options[0].internalPattern = uniq([
				"^[~@#$]/.*",
				`^[$].+`,
				...internalPattern ?? []
			]);
			options[0].groups = uniq([...groups ?? [], ...customSortImportGroups]);
		}
		return config;
	});
}
//#endregion
export { fromSxzz, mgCustomIgnoreConfig, mgCustomRules };
