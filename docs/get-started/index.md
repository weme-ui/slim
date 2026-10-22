# Introduction

Slim 是一套可复用的 Vue 组件 registry，基于 Reka UI 和 UnoCSS。组件以源码写入你的项目，而不是作为运行时包引入。

目前仍处于早期开发，不建议用于生产环境。

## 要求

- Vue 3
- UnoCSS
- Node.js `>= 22.14`

## 初始化

在目标项目根目录执行：

```bash
pnpm dlx @weme-ui/weme-ui init
```

CLI 会写入项目约定（含 UnoCSS preset 等）。若项目里已有 `uno.config.ts`，请确认已启用 `@weme-ui/unocss-preset`：

```ts
import { presetWemeUI } from '@weme-ui/unocss-preset'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWemeUI(),
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|[jt]sx|style\.[jt]s|vine\.[jt]s|mdx?|astro|elm|php|phtml|html)($|\?)/,
      ],
    },
  },
})
```

`content.pipeline.include` 需要覆盖 `*.style.ts`，否则组件样式 class 不会被扫描到。

## 添加组件

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/button
```

这会把 Button 源码、它依赖的 Icon / utils，以及 registry 声明的 npm 依赖写入项目。默认路径与本仓库一致，例如：

- `src/components/button/button.vue`
- `src/utils/props.ts`
- `src/utils/styles.ts`

## 使用

```vue
<script lang="ts" setup>
import Button from '~/components/button/button.vue'
</script>

<template>
  <Button label="Button" />
</template>
```

更多组件见 [Button](/components/button)。
