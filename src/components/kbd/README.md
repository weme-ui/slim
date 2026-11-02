# Kbd

键帽。把键名画成符号，组合键用 `_` 连起来。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/kbd
```

## Usage

## Props

| 属性      | 说明                                                                    | 类型                                       | 默认值   |
| --------- | ----------------------------------------------------------------------- | ------------------------------------------ | -------- |
| `as`      | 根节点渲染为的元素或组件（Reka UI `Primitive`）                         | `AsTag \| Component`                       | `'kbd'`  |
| `asChild` | 合并到子元素上渲染（Reka UI composition）                               | `boolean`                                  | `false`  |
| `value`   | 单个键、键数组，或用 `_` 分开的组合。不在 `kbdKeysMap` 里的键会转成大写 | `KbdKey \| KbdKey[] \| string \| string[]` | —        |
| `variant` | 表面                                                                    | `'soft' \| 'plain'`                        | `'soft'` |
| `size`    | 尺寸                                                                    | `'sm' \| 'md' \| 'lg'`                     | `'md'`   |
| `class`   | 额外 class                                                              | `any`                                      | —        |

## kbdKeysMap

键名到符号。`meta`、`ctrl`、`alt` 在表里是空字符串，挂载后按系统填：macOS 分别是 `⌘`、`⌃`、`⌥`，其它系统是 `Ctrl`、`Ctrl`、`Alt`。

| 字段         | 说明 |
| ------------ | ---- |
| `meta`       | —    |
| `ctrl`       | —    |
| `alt`        | —    |
| `win`        | `⊞`  |
| `command`    | `⌘`  |
| `shift`      | `⇧`  |
| `control`    | `⌃`  |
| `option`     | `⌥`  |
| `enter`      | `↵`  |
| `delete`     | `⌦`  |
| `backspace`  | `⌫`  |
| `escape`     | `⎋`  |
| `tab`        | `⇥`  |
| `capsLock`   | `⇪`  |
| `arrowUp`    | `↑`  |
| `arrowRight` | `→`  |
| `arrowDown`  | `↓`  |
| `arrowLeft`  | `←`  |
| `pageup`     | `⇞`  |
| `pagedown`   | `⇟`  |
| `home`       | `↖`  |
| `end`        | `↘`  |
