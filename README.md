<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://vuetifyjs.b-cdn.net/docs/images/logos/vone-logo-dark.png">
  <img alt="Vuetify One Logo" src="https://vuetifyjs.b-cdn.net/docs/images/logos/vone-logo-light.png" height="150">
</picture>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/@vuetify/one"><img src="https://img.shields.io/npm/v/@vuetify/one.svg" alt="npm version"></a>
  <a href="https://npm.chart.dev/@vuetify/one"><img src="https://img.shields.io/npm/dm/@vuetify/one?color=blue" alt="npm downloads"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://community.vuetifyjs.com"><img src="https://discordapp.com/api/guilds/340160225338195969/widget.png" alt="Discord"></a>
</p>

## Overview

A collection of reusable components designed to seamlessly integrate Vuetify One services throughout the Vuetify ecosystem

## Project Setup

```bash
git clone https://github.com/vuetifyjs/one.git

cd one

pnpm install
```

## Development

```bash
pnpm dev
```

## Building for Production

```bash
pnpm build
```

## Linting


```bash
pnpm lint
```

## Usage

```js
import { VoAppBar, VoAuthBtn, VoSocialFooter } from '@vuetify/one'

export default {
  components: {
    VoAppBar,
    VoAuthBtn,
    VoSocialFooter
  }
}
```
## Store Integration

```js
import { useAuthStore, useOneStore, useProductsStore } from '@vuetify/one'

const authStore = useAuthStore()
const oneStore = useOneStore()
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present Vuetify LLC

----

This project exists and thrives thanks to all the wonderful people who contribute 😍

<br><br>
<a href="https://github.com/vuetifyjs/one/graphs/contributors">
<img src="https://contrib.rocks/image?repo=vuetifyjs/one" />
</a>
