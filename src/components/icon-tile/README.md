# Icon Tile

带底、带圆角的图标块。列表、导航、状态标记都能放。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/icon-tile
```

## Usage

## Props

| 属性       | 说明                                      | 类型                                                                   | 默认值      |
| ---------- | ----------------------------------------- | ---------------------------------------------------------------------- | ----------- |
| `as`       | 渲染为的元素或组件（Reka UI `Primitive`） | `AsTag \| Component`                                                   | `'span'`    |
| `asChild`  | 合并到子元素上渲染（Reka UI composition） | `boolean`                                                              | —           |
| `icon`     | 图标名称或 Iconify 图标数据               | `IconifyIconProps['icon']`                                             | —           |
| `color`    | 色彩                                      | `'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'neutral'` |
| `variant`  | 外观变体                                  | `'solid' \| 'soft' \| 'elevated' \| 'outline' \| 'frame' \| 'inverse'` | `'solid'`   |
| `size`     | 尺寸                                      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                 | `'md'`      |
| `unstyled` | 移除所有样式类，仅保留布局结构            | `boolean`                                                              | —           |
| `class`    | 根节点额外 class                          | `any`                                                                  | —           |
| `ui`       | 覆盖 slots 样式（`root` / `icon`）        | `Partial<IconTileStyleSlots>`                                          | —           |

## Slots

| 插槽      | 说明                                              |
| --------- | ------------------------------------------------- |
| `default` | 自定义内容；未提供且传入 `icon` 时渲染内置 `Icon` |

## Accessibility

默认是 `span`（Reka UI `Primitive`），而且固定 `aria-hidden="true"`，当装饰用。有含义就在旁边写字。
