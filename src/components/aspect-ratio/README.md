# Aspect Ratio

把一块内容锁在固定宽高比里。外层按比例留出高度，内容铺满内层。基于 Reka UI `AspectRatio`。

顺便一提，`class` 加在内层内容盒上，外层那圈用来撑比例的盒子不受它影响。要限制宽度，写在外面包一层上。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/aspect-ratio
```

## Usage

## Props

| 属性      | 说明                                          | 类型                 | 默认值  |
| --------- | --------------------------------------------- | -------------------- | ------- |
| `as`      | 内层渲染为的元素或组件（Reka UI `Primitive`） | `AsTag \| Component` | `'div'` |
| `asChild` | 把内层合并到子元素上渲染                      | `boolean`            | `false` |
| `ratio`   | 宽高比，例如 `16 / 9`                         | `number`             | `1`     |
| `class`   | 内层内容盒的额外 class                        | `any`                | —       |

## Slots

| 插槽      | 说明                     |
| --------- | ------------------------ |
| `default` | 内层内容。没有作用域参数 |
