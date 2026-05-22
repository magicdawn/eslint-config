# @magicdawn/eslint-config

> eslint-config for self use

[![npm version](https://img.shields.io/npm/v/@magicdawn/eslint-config.svg?style=flat-square)](https://www.npmjs.com/package/@magicdawn/eslint-config)
[![npm downloads](https://img.shields.io/npm/dm/@magicdawn/eslint-config.svg?style=flat-square)](https://www.npmjs.com/package/@magicdawn/eslint-config)
[![npm license](https://img.shields.io/npm/l/@magicdawn/eslint-config.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install

```sh
$ pnpm add -D @magicdawn/eslint-config
```

## Usage

### extend from [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)

```ts
import { fromSxzz } from '@magicdawn/eslint-config'
export default fromSxzz()
```

### from ground to up

```ts
import { defineConfig } from 'eslint/config'
import { groundToUpConfigs } from '@magicdawn/eslint-config'

export default defineConfig([
  ...groundToUpConfigs,
  // more configs
])
```

## Extra Setup

### `.vscode/settings.json`

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### `package.json`

```json
{
  "lint-staged": {
    // eslint+prettier on js,json,yaml
    "*.{?(c|m)(j|t)s?(x),json,y?(a)ml}": ["eslint --fix", "prettier --write"],
    "!*.{?(c|m)(j|t)s?(x),json,y?(a)ml}": ["prettier --write --ignore-unknown"],

    // or more aggressive
    "*": ["eslint --fix --no-warn-ignored", "prettier --write --ignore-unknown"]
  }
}
```

### `.prettierignore`

```gitignore
# contents not in .gitignore
pnpm-lock.yaml
```

## License

the MIT License http://magicdawn.mit-license.org
