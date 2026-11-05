# Image

一张图片。还没加载出来，或加载失败时，可以换成 `fallbackSrc`。基于 Reka UI `Primitive`，默认是 `img`。

顺便一提，`alt` 目前没有写到元素上。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/image
```

## Usage

## Props

| 属性              | 说明                                                        | 类型                                                                                                                                                                                     | 默认值      |
| ----------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `as`              | 渲染为的元素或组件（Reka UI `Primitive`）                   | `AsTag \| Component`                                                                                                                                                                     | `'img'`     |
| `asChild`         | 合并到子元素上渲染                                          | `boolean`                                                                                                                                                                                | `false`     |
| `fit`             | 图片在框里怎么放                                            | `'none' \| 'contain' \| 'cover' \| 'fill' \| 'scale'`                                                                                                                                    | `'contain'` |
| `src`             | 图片地址                                                    | `string`                                                                                                                                                                                 | —           |
| `width`           | 宽度，写到元素上                                            | `string \| number`                                                                                                                                                                       | —           |
| `height`          | 高度，写到元素上                                            | `string \| number`                                                                                                                                                                       | —           |
| `fallbackSrc`     | 未进入 `loaded` 时显示的回退图                              | `string`                                                                                                                                                                                 | —           |
| `fallbackDelayMs` | 等待这么多毫秒后再显示 `fallbackSrc`                        | `number`                                                                                                                                                                                 | `0`         |
| `alt`             | 已声明，模板没有绑到元素上                                  | `string`                                                                                                                                                                                 | —           |
| `loading`         | 原生 `loading`                                              | `'eager' \| 'lazy'`                                                                                                                                                                      | —           |
| `referrerPolicy`  | 原生 `referrerpolicy`，同时写到预加载用的 `Image` 上        | `'' \| 'no-referrer' \| 'no-referrer-when-downgrade' \| 'origin' \| 'origin-when-cross-origin' \| 'same-origin' \| 'strict-origin' \| 'strict-origin-when-cross-origin' \| 'unsafe-url'` | —           |
| `crossOrigin`     | 只设置预加载 `Image` 的 `crossOrigin`，不写到渲染出的元素上 | `'' \| 'anonymous' \| 'use-credentials'`                                                                                                                                                 | —           |
| `class`           | 元素额外 class                                              | `any`                                                                                                                                                                                    | —           |

`fit` 为 `scale` 时对应 `object-scale-down`。图片进入 `loaded` 后仍用 `src`，不再显示 `fallbackSrc`。

## Events

| 事件                  | 说明           | 参数                                                |
| --------------------- | -------------- | --------------------------------------------------- |
| `loadingStatusChange` | 加载状态变化时 | `value: 'idle' \| 'loading' \| 'error' \| 'loaded'` |

挂载前先发出 `idle`。没有 `src` 时变为 `error`。

## Slots

| 插槽      | 说明                                   |
| --------- | -------------------------------------- |
| `default` | 元素内的内容。`as` 为 `img` 时不会渲染 |

## Accessibility

默认是原生 `img`。`alt` 没有写到元素上，辅助技术读不到替代文本。
