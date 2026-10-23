# Empty

没内容时放这儿。图标走 `IconTile`，标题、描述、底下还能塞点东西。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/empty
```

## Usage

## Props

| 属性          | 说明                                                                                                          | 类型                                        | 默认值 |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------ |
| `size`        | 尺寸；同时映射内置 `IconTile` 的 `size`（`sm`→`xs`，`md`→`sm`，`lg`→`md`）                                    | `'sm' \| 'md' \| 'lg'`                      | `'md'` |
| `icon`        | 图标；字符串为 Iconify 名，或传入 `IconTile` 的 props。默认 `variant="soft"`，可被对象覆盖；`size` 始终按映射 | `IconifyIconProps['icon'] \| IconTileProps` | —      |
| `title`       | 标题文案；无 `title` 插槽时作为默认内容                                                                       | `string`                                    | —      |
| `description` | 描述文案；无 `description` 插槽时作为默认内容                                                                 | `string`                                    | —      |
| `unstyled`    | 移除样式变体类，仅保留结构                                                                                    | `boolean`                                   | —      |
| `class`       | 根节点额外 class                                                                                              | `any`                                       | —      |
| `ui`          | 覆盖 slots 样式（`root` / `header` / `media` / `title` / `description` / `content`）                          | `Partial<EmptyStyleSlots>`                  | —      |

## Slots

| 插槽          | 说明                                                                                                                         |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `header`      | 自定义整块头部（含 media / title / description）；未传时渲染默认头部结构                                                     |
| `media`       | 自定义媒体区；未传且提供 `icon` 时渲染 `IconTile`（默认 `variant="soft"`，`size` 随 Empty 映射）；无插槽且无 `icon` 时不渲染 |
| `title`       | 标题内容；未传时回退到 `title` prop；无插槽且无 prop 时不渲染                                                                |
| `description` | 描述内容；未传时回退到 `description` prop；无插槽且无 prop 时不渲染                                                          |
| `content`     | 底部内容（如操作按钮）；未提供该插槽时不渲染容器                                                                             |

## Accessibility

默认是 `div`（Reka UI `Primitive`）。里头的 `IconTile` 固定 `aria-hidden="true"`。可读的字放在 `title` / `description`（或对应插槽）里。
