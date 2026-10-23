# useFormFieldContext

字段上下文。Reka UI `createContext`，和 `provideFormFieldContext` 成对。同文件还有 `useFormFieldBindings`，给控件拼 id、aria 和 `data-*`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/use-form-field-context
```

## Usage

```ts
import {
  provideFormFieldContext,
  useFormFieldBindings,
  useFormFieldContext,
} from '~/composables/use-form-field-context'

provideFormFieldContext({ /* FormFieldContextValue */ })

const field = useFormFieldContext()
const bindings = useFormFieldBindings()
```

## Returns

`useFormFieldContext()` 给出 `FormFieldContextValue`。没提供上下文时，行为和 Reka UI `createContext` 一样。

## provideFormFieldContext

配对的 Provider，参数是 `FormFieldContextValue`。

## useFormFieldBindings

没参数。把 `useAttrs()` 和字段上下文拼成控件绑定。`id` / `name` 先看 Context；`required` 两边任一为真就写；禁用时不写 `aria-invalid`。

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

### `FormFieldControlDetail`

| 字段    | 类型      | 说明       |
| ------- | --------- | ---------- |
| `value` | `unknown` | 控件当前值 |

### `FormFieldControlRegistration`

| 字段       | 类型                                     | 说明               |
| ---------- | ---------------------------------------- | ------------------ |
| `id`       | `() => string \| undefined`              | 可选；控件 id 读取 |
| `element`  | `() => HTMLElement \| null \| undefined` | 控件 DOM           |
| `getValue` | `() => unknown`                          | 读取控件当前值     |

### `FormFieldDataAttributes`

| 字段            | 类型              | 说明   |
| --------------- | ----------------- | ------ |
| `data-disabled` | `'' \| undefined` | 禁用   |
| `data-valid`    | `'' \| undefined` | 有效   |
| `data-invalid`  | `'' \| undefined` | 无效   |
| `data-dirty`    | `'' \| undefined` | 已修改 |
| `data-touched`  | `'' \| undefined` | 已触碰 |
| `data-filled`   | `'' \| undefined` | 已填写 |
| `data-focused`  | `'' \| undefined` | 聚焦   |

### `FormFieldContextValue`

| 字段                 | 类型                                                    | 说明                       |
| -------------------- | ------------------------------------------------------- | -------------------------- |
| `fieldId`            | `ComputedRef<string \| undefined>`                      | 字段 id                    |
| `labelId`            | `ComputedRef<string \| undefined>`                      | label id                   |
| `descriptionId`      | `ComputedRef<string \| undefined>`                      | description id             |
| `name`               | `Ref<string \| undefined>`                              | 字段名                     |
| `disabled`           | `ComputedRef<boolean>`                                  | 是否禁用                   |
| `required`           | `Ref<boolean>`                                          | 是否必填                   |
| `loading`            | `ComputedRef<boolean>`                                  | 是否加载中                 |
| `valid`              | `ComputedRef<boolean>`                                  | 是否有效                   |
| `invalid`            | `ComputedRef<boolean>`                                  | 是否无效                   |
| `dirty`              | `ComputedRef<boolean>`                                  | 是否已修改                 |
| `touched`            | `ComputedRef<boolean>`                                  | 是否已触碰                 |
| `filled`             | `ComputedRef<boolean>`                                  | 是否已填写                 |
| `focused`            | `Ref<boolean>`                                          | 是否聚焦                   |
| `dataAttributes`     | `ComputedRef<FormFieldDataAttributes>`                  | 状态 `data-*`              |
| `getControlId`       | `() => string \| undefined`                             | 控件 id                    |
| `focusControl`       | `() => void`                                            | 聚焦控件                   |
| `resetField`         | `() => void`                                            | 重置字段                   |
| `registryControl`    | `(control: FormFieldControlRegistration) => () => void` | 注册控件；返回取消注册函数 |
| `handleControlFocus` | `() => void`                                            | 控件 focus                 |
| `handleControlBlur`  | `(detail?: FormFieldControlDetail) => void`             | 控件 blur；可选携带当前值  |
