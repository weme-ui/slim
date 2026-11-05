---
dependencies:
  - motion-v
---

# Image Preview

点一张图，在浮层里看大图。可以带一组缩略图。打开时锁住页面滚动，点遮罩或按 `Escape` 关掉。基于 Reka UI `Primitive`，动画用 `motion-v`。

顺便一提，`open` 只向外发 `update:open`，组件不读这个 prop。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/image-preview
```

## Usage

## Props

| 属性              | 说明                                                                                                                                                                                    | 类型                                                                                                                                                                                     | 默认值             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `as`              | 触发图渲染成的元素或组件，传给内部 `Image`。根节点固定是 `div`                                                                                                                          | `AsTag \| Component`                                                                                                                                                                     | `'img'`            |
| `asChild`         | 已声明，模板没有使用                                                                                                                                                                    | `boolean`                                                                                                                                                                                | —                  |
| `fit`             | 传给触发图和预览图                                                                                                                                                                      | `'none' \| 'contain' \| 'cover' \| 'fill' \| 'scale'`                                                                                                                                    | `'contain'`        |
| `src`             | 触发图地址。没有缩略图时，预览也用它                                                                                                                                                    | `string`                                                                                                                                                                                 | —                  |
| `width`           | 触发图宽度                                                                                                                                                                              | `string \| number`                                                                                                                                                                       | —                  |
| `height`          | 触发图高度                                                                                                                                                                              | `string \| number`                                                                                                                                                                       | —                  |
| `fallbackSrc`     | 传给触发图、预览图和缩略图                                                                                                                                                              | `string`                                                                                                                                                                                 | —                  |
| `fallbackDelayMs` | 传给触发图和预览图                                                                                                                                                                      | `number`                                                                                                                                                                                 | `0`                |
| `alt`             | 传给触发图和预览图。缩略图用各自的 `alt`                                                                                                                                                | `string`                                                                                                                                                                                 | —                  |
| `loading`         | 传给触发图和预览图                                                                                                                                                                      | `'eager' \| 'lazy'`                                                                                                                                                                      | —                  |
| `referrerPolicy`  | 传给触发图和预览图                                                                                                                                                                      | `'' \| 'no-referrer' \| 'no-referrer-when-downgrade' \| 'origin' \| 'origin-when-cross-origin' \| 'same-origin' \| 'strict-origin' \| 'strict-origin-when-cross-origin' \| 'unsafe-url'` | —                  |
| `crossOrigin`     | 传给触发图和预览图                                                                                                                                                                      | `'' \| 'anonymous' \| 'use-credentials'`                                                                                                                                                 | —                  |
| `open`            | 已声明。内部自己记开关，不读取这个值                                                                                                                                                    | `boolean`                                                                                                                                                                                | —                  |
| `previews`        | 缩略图。单项含 `src`、可选 `alt`                                                                                                                                                        | `ImagePreviewItem[]`                                                                                                                                                                     | —                  |
| `loadingText`     | 预览图还没 `loaded` 时的文案                                                                                                                                                            | `string`                                                                                                                                                                                 | `'Loading...'`     |
| `loadingIcon`     | 加载图标（Iconify）                                                                                                                                                                     | `IconifyIconProps['icon']`                                                                                                                                                               | `'ri:loader-line'` |
| `closeOnEscape`   | 为 `true` 时监听 `Escape` 关闭。只在创建时读取一次                                                                                                                                      | `boolean`                                                                                                                                                                                | `true`             |
| `disabled`        | 为 `true` 时点击不会开关，浮层也不传送到 `body`                                                                                                                                         | `boolean`                                                                                                                                                                                | —                  |
| `class`           | 根节点额外 class                                                                                                                                                                        | `any`                                                                                                                                                                                    | —                  |
| `ui`              | 覆盖 slots 样式（`root` / `trigger` / `content` / `viewport` / `loading` / `loadingText` / `loadingIcon` / `preview` / `previewImage` / `thumbs` / `thumb` / `thumbImage` / `overlay`） | `Partial<ImagePreviewStyleSlots>`                                                                                                                                                        | —                  |

`fit` 为 `scale` 时对应 `object-scale-down`。打开且还没选过图时，预览用 `previews` 第一张，没有缩略图就用 `src`。

## Events

| 事件          | 说明           | 参数             |
| ------------- | -------------- | ---------------- |
| `update:open` | 开关变化时触发 | `value: boolean` |

## Slots

| 插槽      | 说明                                          |
| --------- | --------------------------------------------- |
| `default` | 替换触发图。未提供时用 `src` 渲染一张 `Image` |

## Accessibility

根节点是 `div`，`data-slot="image-preview"`，`data-state` 为 `open` 或 `closed`。浮层有 `aria-label="Image Preview"`。打开时锁住 `body` 滚动。点遮罩关闭。缩略图是 `li`，当前项带 `data-highlighted`。`alt` 会传给 `Image`，但 `Image` 目前没有写到元素上。

### Keyboard Interactions

| Key      | Description                                   |
| -------- | --------------------------------------------- |
| `Escape` | 关闭预览。`closeOnEscape` 为 `false` 时不监听 |
