# Slider

滑动条。拖拇指选数值，可以一个也可以一段。基于 Reka UI `Slider`。可以单独用，也可以放进 `FormField`。有 `FormField` 时会合并 `name` / `disabled` / `required` 与字段 `data-*`。拇指上有 `Tooltip`，外层要包 `TooltipProvider`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/slider
```

## Usage

## Props

| 属性                    | 说明                                                                                                      | 类型                         | 默认值         |
| ----------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| `as`                    | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                                           | `AsTag \| Component`         | `'span'`       |
| `asChild`               | 合并到子元素上渲染（Reka UI composition）                                                                 | `boolean`                    | —              |
| `modelValue`            | 受控值（拇指个数等于数组长度）；可用 `v-model`                                                            | `number[] \| null`           | —              |
| `defaultValue`          | 非受控初始值                                                                                              | `number[]`                   | `[0]`          |
| `min`                   | 最小值                                                                                                    | `number`                     | `0`            |
| `max`                   | 最大值                                                                                                    | `number`                     | `100`          |
| `step`                  | 步进                                                                                                      | `number`                     | `1`            |
| `minStepsBetweenThumbs` | 多拇指时允许的最小间隔（以 `step` 计）                                                                    | `number`                     | `0`            |
| `orientation`           | 方向                                                                                                      | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `dir`                   | 阅读方向；未传时继承 `ConfigProvider`                                                                     | `'ltr' \| 'rtl'`             | —              |
| `inverted`              | 是否视觉反转（并反转部分方向键）                                                                          | `boolean`                    | `false`        |
| `thumbAlignment`        | 拇指与轨道的对齐：`contain` 夹在轨道内，`overflow` 可超出                                                 | `'contain' \| 'overflow'`    | `'contain'`    |
| `size`                  | 尺寸                                                                                                      | `'sm' \| 'md' \| 'lg'`       | `'md'`         |
| `showSteps`             | 是否在轨道上画步进点（最多 11 个，按 10% 均分）                                                           | `boolean`                    | —              |
| `showMarks`             | 是否显示 0% / 50% / 100% 刻度文案（非 `inverted` 时两端为 `max` / `min`，中点为 `(max ?? 100) / 2`）      | `boolean`                    | —              |
| `name`                  | 随表单提交的字段名；未传时回退到 FormField Context                                                        | `string`                     | —              |
| `required`              | 是否必填；会与 FormField Context 的 `required` 合并                                                       | `boolean`                    | —              |
| `disabled`              | 是否禁用；会与 FormField Context 的 `disabled` 合并                                                       | `boolean`                    | `false`        |
| `unstyled`              | 移除样式变体类，仅保留结构                                                                                | `boolean`                    | —              |
| `class`                 | `SliderRoot` 额外 class                                                                                   | `any`                        | —              |
| `ui`                    | 覆盖 slots 样式（`wrapper` / `root` / `track` / `range` / `thumb` / `steps` / `step` / `marks` / `mark`） | `Partial<SliderStyleSlots>`  | —              |

## Events

| 事件                | 说明                                                    | 参数              |
| ------------------- | ------------------------------------------------------- | ----------------- |
| `update:modelValue` | 值变更时触发（含 `v-model`）；由 Reka `SliderRoot` 转发 | `value: number[]` |
| `valueCommit`       | 一次拖动或按键结束后触发；由 Reka `SliderRoot` 转发     | `value: number[]` |

## Accessibility

基于 Reka UI `Slider`（`SliderRoot` / `SliderTrack` / `SliderRange` / `SliderThumb`）。遵循 WAI-ARIA Slider。拇指 `role="slider"`，带 `aria-valuenow` / `aria-valuemin` / `aria-valuemax` / `aria-orientation`。指针按下时本组件另加 `aria-pressed`。根节点设置 `data-slot="slider"`。有 `name` 且在表单里时，Reka 会再画一个隐藏 number input 用来提交。单拇指时 Reka 不自动设 `aria-label`，旁边没有可见文案时请自行加上。`inverted` 为真时，水平方向的 `ArrowLeft` / `ArrowRight` / `Home` / `End`，以及垂直方向的 `ArrowUp` / `ArrowDown` / `PageUp` / `PageDown` 会反转。

### Keyboard Interactions

| Key                       | Description              |
| ------------------------- | ------------------------ |
| `ArrowRight` / `ArrowUp`  | 增大当前拇指的值         |
| `ArrowLeft` / `ArrowDown` | 减小当前拇指的值         |
| `Home`                    | 将第一个拇指设为 `min`   |
| `End`                     | 将最后一个拇指设为 `max` |
| `PageUp` / `PageDown`     | 按 10 倍 `step` 增减     |
| `Shift` + 方向键          | 按 10 倍 `step` 增减     |
