# @magicdawn/eslint-config

> eslint-config for self use

[![npm version](https://img.shields.io/npm/v/@magicdawn/eslint-config.svg?style=flat-square)](https://www.npmjs.com/package/@magicdawn/eslint-config)
[![npm downloads](https://img.shields.io/npm/dm/@magicdawn/eslint-config.svg?style=flat-square)](https://www.npmjs.com/package/@magicdawn/eslint-config)
[![npm license](https://img.shields.io/npm/l/@magicdawn/eslint-config.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install

```sh
$ cnpm i -D @magicdawn/eslint-config
```

AND `eslint` / `eslint-plugin-vue` / `eslint-plugin-react` should be installed As peerDependencies

```sh
$ cnpm i -D @magicdawn/eslint-config eslint eslint-plugin-vue eslint-plugin-react
```

## Usage

### `default` for Node.js project

```yml
# .eslintrc.yml
extends:
  - @magicdawn
```

### `vue` for vue project

```yml
# .eslintrc.yml
extends:
  - @magicdawn/eslint-config/vue
```

### `react` for react project

```yml
# .eslintrc.yml
extends:
  - @magicdawn/eslint-config/react
```

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License http://magicdawn.mit-license.org
