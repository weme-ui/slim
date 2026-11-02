# Progress Bar

进度条。表示一项任务走到哪了。基于 Reka UI `Progress`。可以带标题、当前值和一句说明。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/progress-bar
```

## Usage

## Props

| 属性            | 说明                                                                                                                                                    | 类型                                                                       | 默认值                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `as`            | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                                                                                         | `AsTag \| Component`                                                       | `'div'`                                                                                         |
| `asChild`       | 合并到子元素上渲染（Reka UI composition）                                                                                                               | `boolean`                                                                  | `false`                                                                                         |
| `modelValue`    | 当前进度，可用 `v-model`。空值时 `data-state` 为 `indeterminate`。指示条按 `translateX(-(100 - (modelValue ?? 0))%)` 位移，不除以 `max`                 | `number \| null`                                                           | —                                                                                               |
| `max`           | 最大值。用于 `aria-valuemax`，并作为百分比文案的分母                                                                                                    | `number`                                                                   | `100`                                                                                           |
| `getValueLabel` | 无障碍名称（`aria-label`）。值为数字时默认读成相对 `max` 的整数百分比，否则不设                                                                         | `(value: number \| null \| undefined, max: number) => string \| undefined` | `(value, max) => typeof value === 'number' ? Math.round((value / max) * 100) + '%' : undefined` |
| `getValueText`  | 无障碍数值文本（`aria-valuetext`）。未传时不设                                                                                                          | `(value: number \| null \| undefined, max: number) => string \| undefined` | —                                                                                               |
| `color`         | 指示条颜色                                                                                                                                              | `'default' \| 'accent' \| 'info' \| 'success' \| 'warning' \| 'error'`     | `'default'`                                                                                     |
| `size`          | 尺寸                                                                                                                                                    | `'sm' \| 'md' \| 'lg'`                                                     | `'md'`                                                                                          |
| `label`         | 标题。无 `label` 插槽时作为默认内容。无插槽且无 prop 时不渲染标题行，数值也不显示                                                                       | `string`                                                                   | —                                                                                               |
| `description`   | 说明。无 `description` 插槽时作为默认内容                                                                                                               | `string`                                                                   | —                                                                                               |
| `hideValue`     | 为 `true` 时不渲染数值                                                                                                                                  | `boolean`                                                                  | —                                                                                               |
| `formatOptions` | 数值文案的 `Intl.NumberFormat` 选项。`style` 为 `'percent'` 时格式化 `(modelValue ?? 0) / (max ?? 100)`，否则格式化 `modelValue ?? 0`。只在有标题时出现 | `Intl.NumberFormatOptions`                                                 | `{ style: 'percent' }`                                                                          |
| `class`         | 轨道额外 class（加在 track 上）                                                                                                                         | `any`                                                                      | —                                                                                               |
| `ui`            | 覆盖 slots 样式（`root` / `track` / `indicator` / `caption` / `label` / `description` / `value`）                                                       | `Partial<ProgressBarStyleSlots>`                                           | —                                                                                               |

## Events

| 事件                | 说明                                                              | 参数                           |
| ------------------- | ----------------------------------------------------------------- | ------------------------------ |
| `update:modelValue` | 值变更时触发（含 `v-model`）；由 Reka `ProgressRoot` 转发         | `value: string[] \| undefined` |
| `update:max`        | `max` 变更时触发（含 `v-model:max`）；由 Reka `ProgressRoot` 转发 | `value: number`                |

## Slots

| 插槽          | 说明                                                                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `label`       | 标题内容。未传时回退到 `label`。无插槽且无 prop 时不渲染标题行                                                                           |
| `value`       | 数值文案。作用域参数 `{ modelValue, value }`。`modelValue` 是当前进度，`value` 是格式化后的字符串。仅在有标题且 `hideValue` 不为真时渲染 |
| `description` | 说明内容。未传时回退到 `description`。无插槽且无 prop 时不渲染                                                                           |

## Accessibility

基于 Reka UI `ProgressRoot`（内含 `ProgressIndicator`）。根节点 `role="progressbar"`，`aria-valuemin` 为 `0`，`aria-valuemax` 为 `max`。值为数字时设置 `aria-valuenow`，`aria-label` 来自 `getValueLabel`，`aria-valuetext` 来自 `getValueText`。`data-state` 为空值时是 `indeterminate`，等于 `max` 时是 `complete`，否则是 `loading`。根节点还有 `data-value`、`data-max`，以及 `data-slot="progress-bar"`。
