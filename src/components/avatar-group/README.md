# Avatar Group

把头像叠成一排。`max` 限制个数，多出来的显示成 `+N`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/avatar-group
```

## Usage

## Props

| 属性             | 说明                                                                                | 类型                                                                                                                                                                                     | 默认值  |
| ---------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `as`             | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                     | `AsTag \| Component`                                                                                                                                                                     | `'div'` |
| `color`          | 下发给子 Avatar 和 `+N` 的颜色。单项自己的 `color` 优先                             | `'default' \| 'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'inverse'`                                                                                         | —       |
| `size`           | 下发给子 Avatar 和 `+N` 的尺寸。单项自己的 `size` 优先                              | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'`                                                                                                                        | `'md'`  |
| `items`          | 头像列表。单项是去掉 `crossOrigin`、`referrerPolicy`、`delayMs` 之后的 Avatar props | `AvatarGroupItem[]`                                                                                                                                                                      | —       |
| `max`            | 只取前几项。行是反过来排的，第一项靠右，`+N` 在最右                                 | `number`                                                                                                                                                                                 | —       |
| `crossOrigin`    | 声明在 props 上。当前模板没有传给子 Avatar                                          | `'' \| 'anonymous' \| 'use-credentials'`                                                                                                                                                 | —       |
| `referrerPolicy` | 声明在 props 上。当前模板没有传给子 Avatar                                          | `'' \| 'no-referrer' \| 'no-referrer-when-downgrade' \| 'origin' \| 'origin-when-cross-origin' \| 'same-origin' \| 'strict-origin' \| 'strict-origin-when-cross-origin' \| 'unsafe-url'` | —       |
| `delayMs`        | 声明在 props 上。当前模板没有传给子 Avatar                                          | `number`                                                                                                                                                                                 | —       |
| `class`          | 根节点额外 class                                                                    | `any`                                                                                                                                                                                    | —       |
| `ui`             | 覆盖 slots 样式（`root` / `item`）                                                  | `Partial<AvatarGroupStyleSlots>`                                                                                                                                                         | —       |

## Slots

| 插槽      | 说明                                                          |
| --------- | ------------------------------------------------------------- |
| `default` | 自定义整组内容。传入后不再根据 `items` 和 `max` 渲染子 Avatar |
