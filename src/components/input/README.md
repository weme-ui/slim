# Input

单行输入。可以单独用，也可以放进 `FormField`。有 `FormField` 时 `id` / `aria-*` / `data-*` 走字段上下文。前后缀、清除、字数、加载都有。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/input
```

## Usage

## Props

| 属性             | 说明                                                                                                             | 类型                                                                        | 默认值             |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------ |
| `as`             | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                                                  | `any`                                                                       | `'div'`            |
| `modelValue`     | 受控值                                                                                                           | `string \| number \| null \| undefined`                                     | —                  |
| `defaultValue`   | 非受控初始值                                                                                                     | `string \| number \| null \| undefined`                                     | —                  |
| `variant`        | 外观变体                                                                                                         | `'soft' \| 'outline'`                                                       | `'soft'`           |
| `size`           | 尺寸                                                                                                             | `'sm' \| 'md' \| 'lg'`                                                      | `'md'`             |
| `radius`         | 圆角                                                                                                             | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                  | `'md'`             |
| `prefix`         | 前缀文案（无 `prefix` 插槽且无 `prefixIcon` 时展示）                                                             | `string`                                                                    | —                  |
| `suffix`         | 后缀文案（无 `suffix` 插槽且无图标 / loading 时展示）                                                            | `string`                                                                    | —                  |
| `prefixIcon`     | 前缀图标（Iconify）                                                                                              | `IconifyIconProps['icon']`                                                  | —                  |
| `suffixIcon`     | 后缀图标（Iconify）；loading 时改显示 `loadingIcon`                                                              | `IconifyIconProps['icon']`                                                  | —                  |
| `loadingIcon`    | 加载中图标（Iconify）                                                                                            | `IconifyIconProps['icon']`                                                  | `'ri:loader-line'` |
| `clearIcon`      | 清除按钮图标（Iconify）                                                                                          | `IconifyIconProps['icon']`                                                  | `'ri:close-line'`  |
| `autoFocus`      | 挂载后聚焦原生 `<input>`                                                                                         | `boolean`                                                                   | —                  |
| `countable`      | 配合 `maxLength` 显示字数                                                                                        | `boolean`                                                                   | —                  |
| `clearable`      | 有值且未禁用时显示清除按钮                                                                                       | `boolean`                                                                   | —                  |
| `unstyled`       | 去掉默认样式                                                                                                     | `boolean`                                                                   | —                  |
| `maxLength`      | 最大长度（`countable` 展示用，需大于 `0`）                                                                       | `number`                                                                    | —                  |
| `type`           | 原生 input 类型                                                                                                  | `'text' \| 'email' \| 'number' \| 'url' \| 'tel' \| 'search' \| 'password'` | `'text'`           |
| `autocomplete`   | 原生 autocomplete                                                                                                | `'on' \| 'off' \| 'string'`                                                 | `'off'`            |
| `placeholder`    | 占位文案                                                                                                         | `string`                                                                    | —                  |
| `modelModifiers` | `v-model` modifiers（`lazy` / `trim` / `number` / `string` / `nullable` / `optional`）                           | `InputModelModifiers`                                                       | —                  |
| `class`          | 根节点额外 class                                                                                                 | `any`                                                                       | —                  |
| `ui`             | 覆盖 slots 样式（`root` / `prefix` / `prefixIcon` / `input` / `suffix` / `suffixIcon` / `counter` / `cleanBtn`） | `Partial<InputStyleSlots>`                                                  | —                  |
| `id`             | 控件 `id`；未传时用 FormField Context                                                                            | `string`                                                                    | —                  |
| `name`           | 控件 `name`；未传时用 FormField Context                                                                          | `string`                                                                    | —                  |
| `disabled`       | 是否禁用；未传时用 FormField Context                                                                             | `boolean`                                                                   | —                  |
| `required`       | 是否必填；会与 FormField Context 合并                                                                            | `boolean`                                                                   | —                  |
| `invalid`        | 是否无效；未传时用 FormField Context                                                                             | `boolean`                                                                   | —                  |
| `loading`        | 是否加载中；未传时用 FormField Context                                                                           | `boolean`                                                                   | —                  |

## Events

| 事件                | 说明                                                     | 参数                                           |
| ------------------- | -------------------------------------------------------- | ---------------------------------------------- |
| `update:modelValue` | 值变更（含 `v-model`）                                   | `value: string \| number \| null \| undefined` |
| `change`            | 原生 `change`，或点清除时为 `null`                       | `value: string \| number \| null \| undefined` |
| `enter`             | 按 `Enter`。`lazy` 时写入 model；`trim` 时先 trim 展示值 | `value: string \| number \| null \| undefined` |
| `focus`             | 获得焦点                                                 | `event: FocusEvent`                            |
| `blur`              | 失去焦点                                                 | `event: FocusEvent`                            |

## Slots

| 插槽        | 说明                                                       |
| ----------- | ---------------------------------------------------------- |
| `default`   | 输入框与清除按钮之间的自定义内容                           |
| `prefix`    | 自定义前缀；未传时回退到 `prefixIcon` / `prefix`           |
| `suffix`    | 自定义后缀；未传时回退到 loading / `suffixIcon` / `suffix` |
| `cleanIcon` | 自定义清除图标；未传时回退到 `clearIcon`                   |

## Accessibility

原生 `<input>`，包在 Reka UI `Primitive` 里（默认 `div`）。`id` / `name` / `aria-*` / `data-*` 走 `useFormFieldControl`。根节点 `data-slot="input"`。

### Keyboard Interactions

| Key     | Description                                         |
| ------- | --------------------------------------------------- |
| `Enter` | 触发 `enter`；`lazy` 时写入 model；`trim` 时先 trim |
