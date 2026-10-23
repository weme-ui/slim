---
dependencies:
  - '@tanstack/vue-form'
---

# useFormContext

基于 Reka UI `createContext` 的 Form 上下文：消费 `FormContextValue`，并与 `provideFormContext` 成对使用。同文件还再导出 TanStack Vue Form 的 `useForm` / `useFormField` 与相关类型。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/use-form-context
```

## Usage

```ts
import {
  provideFormContext,
  useForm,
  useFormContext,
  useFormField,
} from '~/composables/use-form-context'

provideFormContext({ /* FormContextValue */ })

const { form, loading, disabled, validationMode, serverErrors } = useFormContext()

const formApi = useForm({ /* ... */ })
const field = useFormField({ name: 'email' })
```

## Returns

`useFormContext()` 返回 `FormContextValue`（由 `createContext` 注入；未提供上下文时行为与 Reka UI `createContext` 一致）。

## provideFormContext

与 `useFormContext` 成对的 Provider，参数类型为 `FormContextValue`。

## useForm

从 `@tanstack/vue-form` 再导出，用于创建表单实例。

## useFormField

从 `@tanstack/vue-form` 的 `useField` 再导出（别名为 `useFormField`）。

## Types

### `FormApi`

`CoreFormApi` 与 `VueFormApi`（均来自 `@tanstack/vue-form`）的交叉类型，用于标注表单实例。

### `FormValidationMode`

`'onSubmit' \| 'onBlur' \| 'onChange'`

### `FormRegisteredField`

| 字段                | 类型                             | 说明                   |
| ------------------- | -------------------------------- | ---------------------- |
| `name`              | `Ref<string \| undefined>`       | 字段名                 |
| `invalid`           | `ComputedRef<boolean>`           | 是否无效               |
| `getValue`          | `() => unknown`                  | 读取当前值             |
| `getControlElement` | `() => HTMLElement \| undefined` | 控件 DOM（用于聚焦等） |
| `resetField`        | `() => void`                     | 重置该字段             |

### `FormContextValue`

| 字段             | 类型                                              | 说明                          |
| ---------------- | ------------------------------------------------- | ----------------------------- |
| `serverErrors`   | `ComputedRef<Record<string, string \| string[]>>` | 服务端 / 外部错误（按字段名） |
| `validationMode` | `Ref<FormValidationMode>`                         | 字段校验时机                  |
| `disabled`       | `Ref<boolean>`                                    | 是否禁用                      |
| `loading`        | `Ref<boolean>`                                    | 是否加载中                    |
| `form`           | `FormApi`                                         | 表单 API                      |
| `getValues`      | `() => Record<string, unknown>`                   | 读取当前表单值                |
| `registerField`  | `(field: FormRegisteredField) => () => void`      | 注册字段；返回取消注册函数    |
