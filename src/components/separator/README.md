# Separator

中间画条线，把两块内容分开。可以带字，样子也能换。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/separator
```

## Usage

## Props

| 属性            | 说明                                                              | 类型                                                        | 默认值         |
| --------------- | ----------------------------------------------------------------- | ----------------------------------------------------------- | -------------- |
| `as`            | 渲染为的元素或组件（Reka UI `Primitive`）                         | `AsTag \| Component`                                        | `'div'`        |
| `orientation`   | 方向                                                              | `'horizontal' \| 'vertical'`                                | `'horizontal'` |
| `decorative`    | 是否为纯装饰；为 `true` 时从无障碍树中移除（仅无 `label` 时生效） | `boolean`                                                   | —              |
| `color`         | 颜色                                                              | `'base' \| 'elevated' \| 'inverted'`                        | `'base'`       |
| `variant`       | 外观变体                                                          | `'solid' \| 'dashed' \| 'dotted' \| 'double' \| 'gradient'` | `'solid'`      |
| `label`         | 分隔线上的标签文案                                                | `string`                                                    | —              |
| `labelPosition` | 标签位置；未传 `label` 时按 `none` 处理                           | `'none' \| 'start' \| 'center' \| 'end'`                    | `'center'`     |
| `class`         | 根节点额外 class                                                  | `any`                                                       | —              |
| `ui`            | 覆盖 slots 样式（`root` / `label` / `line`）                      | `Partial<SeparatorStyleSlots>`                              | —              |

## Slots

| 插槽      | 说明                                                                    |
| --------- | ----------------------------------------------------------------------- |
| `default` | 自定义标签内容；仅在传入 `label` 时渲染，未提供插槽内容时回退到 `label` |

## Accessibility

按 WAI-ARIA Separator 来的，底下是 Reka UI `Separator`。

没 `label` 时默认 `role="separator"`。`decorative` 为 `true` 就变成 `role="none"`，辅助技术看不到。垂直且非装饰时加 `aria-orientation="vertical"`。

有 `label` 时根节点仍是 `role="separator"`，标签上有 `aria-label`。两边的线强制 `decorative`。
