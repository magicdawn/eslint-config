/**
 * https://perfectionist.dev/rules/sort-imports#groups
 *
 * modifier & selector are terms of perfectionist
 */

/* #region default groups */
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
/* #endregion */

/* #region sxzz configed */
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
/* #endregion */

// what: type | value | style
// where: builtin | external | internal* | parent | sibling | index

const generalOrder = [
  'builtin',
  'external',

  // different kinds of internal
  'tsconfig-path',
  'subpath', // https://nodejs.org/api/packages.html#packages_subpath_imports
  'internal',

  'parent',
  'index',
  'sibling',
]

function addModifier(modifier: 'type' | 'style') {
  return generalOrder.map((x) => {
    if (typeof x === 'string') return `${modifier}-${x}`
    throw new Error('should not reach here')
  })
}

export const customSortImportGroups = [
  //
  'side-effect-style',
  'side-effect',

  ...generalOrder,
  ...addModifier('type'),
]
