# Radio Group

单选组。可以单独用，也可以放进 `FormField`。有 `FormField` 时会合并 `id` / `name` / `aria-*` / `data-*`。基于 Reka UI `RadioGroupRoot`，按 `items` 渲染选项，支持外观变体、方向与指示器位置。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/radio-group
```

## Usage

## Props

| 属性           | 说明                                                                                                         | 类型                            | 默认值         |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------- | -------------- |
| `as`           | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                                              | `AsTag \| Component`            | `'div'`        |
| `items`        | 选项列表；单项含 `value`（`AcceptableValue`）、`label`、`description`、`disabled`、`class`                   | `RadioGroupItem[]`              | —              |
| `modelValue`   | 受控选中值；可用 `v-model`；`AcceptableValue` 为 `string \| number \| bigint \| Record<string, any> \| null` | `AcceptableValue`               | —              |
| `defaultValue` | 非受控初始选中值                                                                                             | `AcceptableValue`               | —              |
| `loop`         | 键盘漫游到尽头时是否循环                                                                                     | `boolean`                       | `true`         |
| `dir`          | 阅读方向（影响水平漫游）；未传时继承 `ConfigProvider`                                                        | `'ltr' \| 'rtl'`                | —              |
| `variant`      | 外观变体                                                                                                     | `'soft' \| 'outline' \| 'card'` | `'soft'`       |
| `size`         | 尺寸                                                                                                         | `'sm' \| 'md' \| 'lg'`          | `'md'`         |
| `orientation`  | 布局与漫游方向                                                                                               | `'horizontal' \| 'vertical'`    | `'horizontal'` |
| `indicator`    | 指示器位置；`none` 时仅保留无障碍指示器（可视隐藏）                                                          | `'start' \| 'end' \| 'none'`    | `'start'`      |
| `inverted`     | 反色样式变体                                                                                                 | `boolean`                       | —              |
| `unstyled`     | 移除样式变体类，仅保留结构                                                                                   | `boolean`                       | —              |
| `id`           | 控件 `id`；未传时回退到 FormField Context                                                                    | `string`                        | —              |
| `name`         | 控件 `name`；未传时回退到 FormField Context                                                                  | `string`                        | —              |
| `required`     | 是否必填；会与 FormField Context 的 `required` 合并                                                          | `boolean`                       | —              |
| `disabled`     | 是否禁用整组；会与 FormField Context 的 `disabled` 合并                                                      | `boolean`                       | —              |
| `invalid`      | 是否无效；会与 FormField Context 的 `invalid` 合并                                                           | `boolean`                       | —              |
| `class`        | 根节点额外 class                                                                                             | `any`                           | —              |
| `ui`           | 覆盖 slots 样式（`root` / `item` / `indicator` / `indicatorIcon` / `content` / `label` / `description`）     | `Partial<RadioGroupStyleSlots>` | —              |

## Events

| 事件                | 说明                                                            | 参数                     |
| ------------------- | --------------------------------------------------------------- | ------------------------ |
| `update:modelValue` | 选中值变更时触发（含 `v-model`）；由 Reka `RadioGroupRoot` 转发 | `value: AcceptableValue` |
| `change`            | `update:modelValue` 时同步触发                                  | `value: AcceptableValue` |

## Slots

| 插槽          | 说明                                                                     |
| ------------- | ------------------------------------------------------------------------ |
| `indicator`   | 覆盖各项指示器内容；作用域参数 `{ state }`（`'checked' \| 'unchecked'`） |
| `label`       | 覆盖各项标签；作用域参数 `{ state }`；未传时回退到 `item.label`          |
| `description` | 覆盖各项描述；作用域参数 `{ state }`；未传时回退到 `item.description`    |

## Accessibility

遵循 WAI-ARIA Radio Group 设计模式。基于 Reka UI `RadioGroupRoot`（`role="radiogroup"`、`aria-orientation`、`aria-required`）与 `RadioGroupItem`（`role="radio"`、`aria-checked`、`data-state`）。组内始终启用 roving focus。组根通过 `useFormFieldControl` 合并 `id` / `name` / `disabled` / `aria-*` 与字段 `data-*`，并向 FormField 注册为控件。根节点设置 `data-slot="radio-group"`、`data-indicator`。`Enter` 在各项上被显式 `preventDefault`，不触发选中。

### Keyboard Interactions

| Key                        | Description                            |
| -------------------------- | -------------------------------------- |
| `Tab`                      | 进入 / 离开组（组内仅一项在 Tab 序中） |
| `ArrowUp` / `ArrowDown`    | 垂直方向时在组内移动焦点并选中该项     |
| `ArrowLeft` / `ArrowRight` | 水平方向时在组内移动焦点并选中该项     |
| `Space`                    | 选中当前焦点项                         |
