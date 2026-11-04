# Segmented Control

分段选择。同一时间只能选一项，选中项上有滑动指示器。可以单独用，也可以放进 `FormField`。基于 Reka UI `RovingFocusGroup`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/segmented-control
```

## Usage

## Props

| 属性                        | 说明                                                                                                                          | 类型                                  | 默认值         |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | -------------- |
| `as`                        | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                                                               | `AsTag \| Component`                  | `'div'`        |
| `asChild`                   | 合并到子元素上渲染（Reka UI composition）                                                                                     | `boolean`                             | `false`        |
| `items`                     | 选项列表。单项含 `value`（`string \| number`）、`label`、`icon`、`selectedIcon`、`disabled`、`class`、`iconClass`、`onSelect` | `SegmentedControlItem[]`              | —              |
| `modelValue`                | 受控选中值；可用 `v-model`                                                                                                    | `string \| number`                    | —              |
| `defaultValue`              | 非受控初始选中值                                                                                                              | `string \| number`                    | —              |
| `orientation`               | 布局与漫游方向                                                                                                                | `'horizontal' \| 'vertical'`          | `'horizontal'` |
| `size`                      | 尺寸                                                                                                                          | `'sm' \| 'md' \| 'lg'`                | `'md'`         |
| `dir`                       | 阅读方向（影响水平漫游）；未传时继承 `ConfigProvider`                                                                         | `'ltr' \| 'rtl'`                      | —              |
| `loop`                      | 键盘漫游到尽头时是否循环                                                                                                      | `boolean`                             | `false`        |
| `currentTabStopId`          | 当前焦点项 id（可 `v-model`）                                                                                                 | `string \| null`                      | —              |
| `defaultCurrentTabStopId`   | 非受控模式下的初始焦点项 id                                                                                                   | `string`                              | —              |
| `preventScrollOnEntryFocus` | 入口聚焦时是否阻止把焦点项滚进视口                                                                                            | `boolean`                             | `false`        |
| `id`                        | 控件 `id`；未传时回退到 FormField Context                                                                                     | `string`                              | —              |
| `name`                      | 控件 `name`；未传时回退到 FormField Context                                                                                   | `string`                              | —              |
| `required`                  | 是否必填；会与 FormField Context 的 `required` 合并                                                                           | `boolean`                             | —              |
| `disabled`                  | 是否禁用整组；会与 FormField Context 的 `disabled` 合并                                                                       | `boolean`                             | —              |
| `invalid`                   | 是否无效；会与 FormField Context 的 `invalid` 合并                                                                            | `boolean`                             | —              |
| `class`                     | 根节点额外 class                                                                                                              | `any`                                 | —              |
| `ui`                        | 覆盖 slots 样式（`root` / `item` / `icon` / `label` / `indicator`）                                                           | `Partial<SegmentedControlStyleSlots>` | —              |

`items` 里的 `onSelect` 在选中变更前调用，参数是该项的 `value`。`icon` 与 `selectedIcon` 交给 `AnimatedToggleIcon`：未选中用 `icon`，选中用 `selectedIcon`。

## Events

| 事件                      | 说明                             | 参数                                 |
| ------------------------- | -------------------------------- | ------------------------------------ |
| `update:modelValue`       | 选中值变更时触发（含 `v-model`） | `value: string \| number`            |
| `change`                  | 选中值变更时同步触发             | `value: string \| number`            |
| `entryFocus`              | 组获得入口焦点时触发             | `event: Event`                       |
| `update:currentTabStopId` | 当前焦点项 id 变化时触发         | `value: string \| null \| undefined` |

已选中或禁用（整组或该项）时，不会再发出 `update:modelValue` 和 `change`。

## Slots

| 插槽      | 说明                                                                                     |
| --------- | ---------------------------------------------------------------------------------------- |
| `default` | 覆盖单项全部内容（图标、标签、附加内容都不再渲染）。作用域参数 `{ item, state, value }`  |
| `icon`    | 覆盖图标。有 `item.icon` 或提供该插槽时渲染。作用域参数同上。默认是 `AnimatedToggleIcon` |
| `label`   | 覆盖标签。有 `item.label` 或提供该插槽时渲染。作用域参数同上。未传时回退到 `item.label`  |
| `append`  | 标签后的附加内容。作用域参数同上                                                         |

`state` 为 `'checked' \| 'unchecked'`。`value` 是当前选中值。

## Accessibility

根节点是 Reka UI `RovingFocusGroup`，`role="radiogroup"`，`data-slot="segmented-control"`。每一项是按钮，`role="radio"`，`data-slot="segmented-control-item"`，带 `aria-checked`、`aria-label`（来自 `item.label`）和 `data-state`（`checked` / `unchecked`）。组内使用 roving focus。`useFormFieldControl` 合并 `id`、`name`、`disabled` 和字段 `data-*`，并向 FormField 注册控件。另有一个可视隐藏的 `input`，承接这些表单属性。点击、获得焦点、`Enter` 或 `Space` 会选中该项。

### Keyboard Interactions

| Key                        | Description                                        |
| -------------------------- | -------------------------------------------------- |
| `Tab`                      | 进入 / 离开组（组内仅一项在 Tab 序中）             |
| `ArrowLeft` / `ArrowRight` | 水平方向移动焦点并选中该项；`dir="rtl"` 时左右对调 |
| `ArrowUp` / `ArrowDown`    | 垂直方向移动焦点并选中该项                         |
| `Home` / `PageUp`          | 将焦点移到第一项并选中                             |
| `End` / `PageDown`         | 将焦点移到最后一项并选中                           |
| `Enter` / `Space`          | 选中当前焦点项                                     |
