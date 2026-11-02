# Skeleton

骨架屏。内容还没到的时候，先占住一块位置。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/skeleton
```

## Usage

## Props

| 属性      | 说明                                                                           | 类型                           | 默认值   |
| --------- | ------------------------------------------------------------------------------ | ------------------------------ | -------- |
| `variant` | 占位形状。`data-slot` 是 `skeleton-text`、`skeleton-rect` 或 `skeleton-circle` | `'text' \| 'rect' \| 'circle'` | `'rect'` |
| `class`   | 额外 class。`text` 自带高度，`rect` 和 `circle` 要自己给宽高                   | `any`                          | —        |
