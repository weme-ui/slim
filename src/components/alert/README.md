# Alert

提示条。可以有图标、标题和描述。`status` 会换上对应图标和配色。标题和描述同时在时，标题更重、描述更淡；只有一边时，内容跟图标垂直居中。可以关掉，也可以整条变成链接。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/alert
```

## Usage

## Props

| 属性           | 说明                                                                                                                                                              | 类型                                          | 默认值                    |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------- |
| `as`           | 渲染为的元素或组件（Reka UI `Primitive`）                                                                                                                         | `AsTag \| Component`                          | `'div'`                   |
| `asChild`      | 合并到子元素上渲染（Reka UI composition）                                                                                                                         | `boolean`                                     | `false`                   |
| `variant`      | 外观变体                                                                                                                                                          | `'solid' \| 'soft' \| 'outline' \| 'inverse'` | `'soft'`                  |
| `status`       | 语义状态。会覆盖 `icon`，并切换配色                                                                                                                               | `'info' \| 'success' \| 'warning' \| 'error'` | —                         |
| `icon`         | 图标（Iconify）。`info` 为 `ri:information-line`，`success` 为 `ri:checkbox-circle-line`，`warning` 为 `ri:alert-line`，`error` 为 `ri:indeterminate-circle-line` | `IconifyIconProps['icon']`                    | —                         |
| `title`        | 标题文案。无 `title` 插槽时作为默认内容                                                                                                                           | `string`                                      | —                         |
| `description`  | 描述文案。无 `description` 插槽时作为默认内容                                                                                                                     | `string`                                      | —                         |
| `visible`      | 是否显示；可用 `v-model:visible`。为 `false` 时不渲染                                                                                                             | `boolean`                                     | `true`                    |
| `closable`     | 是否显示关闭按钮。点击后 `visible` 变为 `false`                                                                                                                   | `boolean`                                     | —                         |
| `closeIcon`    | 关闭图标（Iconify）                                                                                                                                               | `IconifyIconProps['icon']`                    | `'ri:close-line'`         |
| `href`         | 有值时整条可点，并渲染 `LinkOverlay`                                                                                                                              | `string`                                      | —                         |
| `target`       | 链接 `target`，传给 `LinkOverlay`                                                                                                                                 | `'_blank' \| '_self' \| '_parent' \| '_top'`  | —                         |
| `rel`          | 链接 `rel`，传给 `LinkOverlay`                                                                                                                                    | `string`                                      | —                         |
| `externalIcon` | 外链图标（Iconify）。`href` 以 `http` 开头、`target` 为 `_blank` 且 `rel` 为 `'noopener noreferrer'` 时，出现在 `actions`                                         | `IconifyIconProps['icon']`                    | `'ri:external-link-line'` |
| `class`        | 根节点额外 class                                                                                                                                                  | `any`                                         | —                         |
| `ui`           | 覆盖 slots 样式（`root` / `icon` / `content` / `title` / `description` / `actions` / `close`）                                                                    | `Partial<AlertStyleSlots>`                    | —                         |

## Slots

| 插槽           | 说明                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------- |
| `icon`         | 自定义图标。未传时：有 `status` 用状态图标，否则用 `icon`。都没有时不渲染                |
| `title`        | 标题内容。未传时回退到 `title`。无插槽且无 prop 时不渲染                                 |
| `description`  | 描述内容。未传时回退到 `description`。无插槽且无 prop 时不渲染                           |
| `actions`      | 操作区。未传且满足外链条件时渲染 `externalIcon`。无插槽且不是该外链时不渲染              |
| `close`        | 关闭按钮内容。仅 `closable` 时渲染；未传时为 `closeIcon`                                 |
| `link-overlay` | 传给 `LinkOverlay` 的内容。仅有 `href` 时渲染；提供该插槽时 `LinkOverlay` 使用 `asChild` |

## Accessibility

默认是 `div`（Reka UI `Primitive`）。有标题时根节点 `aria-labelledby` 指向标题 `h2`，有描述时 `aria-describedby` 指向描述 `p`。关闭按钮是 `type="button"`，默认内容是 `closeIcon`。有 `href` 时用 `LinkOverlay`（原生 `<a>`）铺开点击区域。

### Keyboard Interactions

| Key               | Description                    |
| ----------------- | ------------------------------ |
| `Enter` / `Space` | 激活关闭按钮（`closable` 时）  |
| `Enter`           | 激活链接并导航（有 `href` 时） |
