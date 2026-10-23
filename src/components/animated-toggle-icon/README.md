---
dependencies:
  - motion-v
---

# Animated Toggle Icon

在未激活 / 激活态之间切换图标，并用 Motion 做缩放进出场过渡。基于 `Icon` 与 `motion-v`。其余未列出的属性经 `$attrs` 透传至 `Motion`（`inheritAttrs: false`）。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/animated-toggle-icon
```

## Usage

## Props

| 属性         | 说明                                             | 类型                       | 默认值 |
| ------------ | ------------------------------------------------ | -------------------------- | ------ |
| `icon`       | 未激活态图标（Iconify）；必填                    | `IconifyIconProps['icon']` | —      |
| `activeIcon` | 激活态图标（Iconify）；未传时激活态回退到 `icon` | `IconifyIconProps['icon']` | —      |
| `active`     | 是否为激活态；切换时触发进出场动画               | `boolean`                  | —      |
| `class`      | 根节点额外 class                                 | `any`                      | —      |

## Accessibility

通过 `motion-v` 的 `Motion`（`as-child`）渲染为 `Icon`，并设置 `data-slot="animated-toggle-icon"`、`data-active`（由 `active` 映射）。根节点带有 `pointer-events-none`。不含独立键盘交互；若图标表达独立含义，请在相邻元素提供等效文本，或为图标设置可访问名称。
