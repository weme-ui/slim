# useFormFieldContext

字段上下文。Reka UI `createContext`，和 `provideFormFieldContext` 成对。没包在 `FormField` 里时返回 `null`，控件可以单独用。控件走 `useFormFieldControl` 拼 id、aria 和 `data-*`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/use-form-field-context
```

## Usage

```ts
import {
  provideFormFieldContext,
  useFormFieldContext,
  useFormFieldControl,
} from '~/composables/use-form-field-context'

provideFormFieldContext({ /* FormFieldContextValue */ })

const field = useFormFieldContext()
const control = useFormFieldControl(props)
```

## Returns

`useFormFieldContext()` 给出 `FormFieldContextValue`。没提供上下文时返回 `null`，不抛错。

## provideFormFieldContext

配对的 Provider，参数是 `FormFieldContextValue`。

## useFormFieldControl

参数是 `FormFieldSharedProps`。合并 props 与 Context。没有 Context 时用 props，并自己记聚焦、写 `data-focused`。`registerControl` 在没有 Context 时是空操作。

| 字段                 | 类型                                                                                                                                                   | 说明                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `bindings`           | `ComputedRef<object>`                                                                                                                                  | 控件 attrs、aria                 |
| `id`                 | `ComputedRef<string \| undefined>`                                                                                                                     | 控件 id                          |
| `name`               | `ComputedRef<string \| undefined>`                                                                                                                     | 字段名                           |
| `required`           | `ComputedRef<boolean \| undefined>`                                                                                                                    | 是否必填                         |
| `loading`            | `ComputedRef<boolean \| undefined>`                                                                                                                    | 是否加载中                       |
| `disabled`           | `ComputedRef<boolean \| undefined>`                                                                                                                    | 是否禁用                         |
| `invalid`            | `ComputedRef<boolean \| undefined>`                                                                                                                    | 是否无效                         |
| `dataAttributes`     | `ComputedRef<Record<string, '' \| undefined>>`                                                                                                         | 状态 `data-*`                    |
| `registerControl`    | `(control: { id?: () => string \| undefined; element: () => HTMLElement \| null \| undefined; getValue: () => unknown }) => (() => void) \| undefined` | 注册控件；返回取消注册函数       |
| `handleControlFocus` | `() => boolean`                                                                                                                                        | 控件 focus；已聚焦时返回 `false` |
| `handleControlBlur`  | `(detail?: { value: unknown }) => boolean`                                                                                                             | 控件 blur；未聚焦时返回 `false`  |

## Types

### `FormFieldSharedProps`

| 字段       | 类型      | 说明 |
| ---------- | --------- | ---- |
| `id`       | `string`  | 可选 |
| `name`     | `string`  | 可选 |
| `disabled` | `boolean` | 可选 |
| `required` | `boolean` | 可选 |
| `invalid`  | `boolean` | 可选 |
| `loading`  | `boolean` | 可选 |

### `FormFieldContextValue`

| 字段                 | 类型                                                                                                                                    | 说明                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `fieldId`            | `ComputedRef<string \| undefined>`                                                                                                      | 字段 id                    |
| `labelId`            | `ComputedRef<string \| undefined>`                                                                                                      | label id                   |
| `descriptionId`      | `ComputedRef<string \| undefined>`                                                                                                      | description id             |
| `name`               | `Ref<string \| undefined>`                                                                                                              | 字段名                     |
| `disabled`           | `ComputedRef<boolean>`                                                                                                                  | 是否禁用                   |
| `required`           | `Ref<boolean>`                                                                                                                          | 是否必填                   |
| `loading`            | `ComputedRef<boolean>`                                                                                                                  | 是否加载中                 |
| `valid`              | `ComputedRef<boolean>`                                                                                                                  | 是否有效                   |
| `invalid`            | `ComputedRef<boolean>`                                                                                                                  | 是否无效                   |
| `dirty`              | `ComputedRef<boolean>`                                                                                                                  | 是否已修改                 |
| `touched`            | `ComputedRef<boolean>`                                                                                                                  | 是否已触碰                 |
| `filled`             | `ComputedRef<boolean>`                                                                                                                  | 是否已填写                 |
| `focused`            | `Ref<boolean>`                                                                                                                          | 是否聚焦                   |
| `dataAttributes`     | `ComputedRef<Record<string, '' \| undefined>>`                                                                                          | 状态 `data-*`              |
| `getControlId`       | `() => string \| undefined`                                                                                                             | 控件 id                    |
| `focusControl`       | `() => void`                                                                                                                            | 聚焦控件                   |
| `resetField`         | `() => void`                                                                                                                            | 重置字段                   |
| `registryControl`    | `(control: { id?: () => string \| undefined; element: () => HTMLElement \| null \| undefined; getValue: () => unknown }) => () => void` | 注册控件；返回取消注册函数 |
| `handleControlFocus` | `() => void`                                                                                                                            | 控件 focus                 |
| `handleControlBlur`  | `(detail?: { value: unknown }) => void`                                                                                                 | 控件 blur；可选携带当前值  |
