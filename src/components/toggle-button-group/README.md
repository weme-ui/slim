# Toggle Button Group

开关按钮组。按 `items` 渲染一组 `ToggleButton`。基于 Reka UI `ToggleGroupRoot`，可单选或多选。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/toggle-button-group
```

## Usage

## Props

| 属性           | 说明                                                      | 类型                                                       | 默认值         |
| -------------- | --------------------------------------------------------- | ---------------------------------------------------------- | -------------- |
| `as`           | 根节点渲染为的元素或组件（Reka UI `Primitive`）           | `AsTag \| Component`                                       | `'div'`        |
| `asChild`      | 合并到子元素上渲染（Reka UI composition）                 | `boolean`                                                  | —              |
| `items`        | 选项列表（见 Types 的 `ToggleButtonGroupItem`）           | `ToggleButtonGroupItem[]`                                  | —              |
| `type`         | 单选或多选；未传时按 `modelValue` / `defaultValue` 推断   | `'single' \| 'multiple'`                                   | —              |
| `modelValue`   | 受控选中值；`multiple` 时为数组；可用 `v-model`           | `AcceptableValue \| AcceptableValue[]`                     | —              |
| `defaultValue` | 非受控初始选中值                                          | `AcceptableValue \| AcceptableValue[]`                     | —              |
| `rovingFocus`  | 是否启用组内方向键漫游焦点                                | `boolean`                                                  | `true`         |
| `loop`         | roving focus 到尽头时是否循环                             | `boolean`                                                  | `true`         |
| `dir`          | 阅读方向（影响水平漫游）；未传时继承 `ConfigProvider`     | `'ltr' \| 'rtl'`                                           | —              |
| `orientation`  | 布局与漫游方向                                            | `'horizontal' \| 'vertical'`                               | `'horizontal'` |
| `variant`      | 外观变体（下传到各项 `ToggleButton`）                     | `'soft' \| 'outline' \| 'ghost'`                           | `'soft'`       |
| `size`         | 尺寸（下传到各项；无 `label` 时为正方形）                 | `'sm' \| 'md' \| 'lg'`                                     | `'md'`         |
| `radius`       | 圆角（下传到各项）                                        | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`         |
| `icon`         | 未按下态图标（Iconify）；各项未设 `icon` 时回退到此值     | `IconifyIconProps['icon']`                                 | —              |
| `activeIcon`   | 按下态图标（Iconify）；各项未设 `activeIcon` 时回退到此值 | `IconifyIconProps['icon']`                                 | —              |
| `scalable`     | 指针按下时是否缩放（禁用时不生效）                        | `boolean`                                                  | `true`         |
| `unstyled`     | 移除各项样式变体类，仅保留结构                            | `boolean`                                                  | —              |
| `name`         | 随表单提交的字段名                                        | `string`                                                   | —              |
| `required`     | 是否必填                                                  | `boolean`                                                  | —              |
| `disabled`     | 是否禁用整组                                              | `boolean`                                                  | `false`        |
| `class`        | 根节点额外 class                                          | `any`                                                      | —              |
| `ui`           | 覆盖 slots 样式（`root` / `item` / `icon` / `label`）     | `Partial<ToggleButtonGroupStyleSlots>`                     | —              |

## Events

| 事件                | 说明                                                             | 参数                                          |
| ------------------- | ---------------------------------------------------------------- | --------------------------------------------- |
| `update:modelValue` | 选中值变更时触发（含 `v-model`）；由 Reka `ToggleGroupRoot` 转发 | `value: AcceptableValue \| AcceptableValue[]` |

## Types

### `AcceptableValue`

Reka UI 可提交值：`string | number | bigint | Record<string, any> | null`。

### `ToggleButtonGroupItem`

| 字段         | 说明                                                 | 类型                       |
| ------------ | ---------------------------------------------------- | -------------------------- |
| `value`      | 选项值                                               | `AcceptableValue`          |
| `label`      | 选项标签；未传时该项按图标按钮尺寸                   | `string`                   |
| `icon`       | 未按下态图标（Iconify）；未传时回退到组的 `icon`     | `IconifyIconProps['icon']` |
| `activeIcon` | 按下态图标（Iconify）；未传时回退到组的 `activeIcon` | `IconifyIconProps['icon']` |
| `disabled`   | 是否禁用该项                                         | `boolean`                  |
| `class`      | 该项额外 class                                       | `any`                      |

## Accessibility

基于 Reka UI `ToggleGroupRoot`（`role="group"`，默认 `rovingFocus`）。各项为 `ToggleButton`（`data-state` 为 `on` / `off`）。根节点设置 `data-slot="toggle-button-group"`。有 `name` 且在表单里时，Reka 会再画一个隐藏 input 用来提交。

### Keyboard Interactions

| Key                        | Description                                           |
| -------------------------- | ----------------------------------------------------- |
| `Tab`                      | 进入 / 离开组（roving focus 时组内仅一项在 Tab 序中） |
| `ArrowLeft` / `ArrowRight` | 水平方向时在组内移动焦点（`rovingFocus` 为真）        |
| `ArrowUp` / `ArrowDown`    | 垂直方向时在组内移动焦点（`rovingFocus` 为真）        |
| `Home` / `End`             | 将焦点移到第一项 / 最后一项（`rovingFocus` 为真）     |
| `Space` / `Enter`          | 切换当前焦点项的选中状态                              |
