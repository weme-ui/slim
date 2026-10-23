# 开始使用

Slim 是一套 Vue 组件，用 Reka UI 和 UnoCSS 做的。源码会写进你的项目。

我尽力了，但现在别用在生产上。

## 要求

- Vue 3
- UnoCSS
- Node.js `>= 22.14`

## 初始化

在项目根目录跑这条：

```bash
pnpm dlx @weme-ui/weme-ui init
```

CLI 会把约定写进去，UnoCSS preset 也在里头。项目里要是已经有 `uno.config.ts`，确认开了 `@weme-ui/unocss-preset`：

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

顺便一提，`content.pipeline.include` 得盖到 `*.style.ts`，不然组件样式 class 扫不到。

## 加组件

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/button
```

这会把 Button 的源码、它用到的 Icon / utils，还有 registry 里声明的 npm 依赖写进你的项目。默认路径是：

- `src/components/button/button.vue`
- `src/utils/props.ts`
- `src/utils/styles.ts`

## 用一下

```vue
<script lang="ts" setup>
import Button from '~/components/button/button.vue'
</script>

<template>
  <Button label="Button" />
</template>
```

更多组件从 [Button](/components/button) 看起。
