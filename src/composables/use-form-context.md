---
dependencies:
  - '@tanstack/vue-form'
---

# useFormContext

Form 上下文。Reka UI `createContext`，和 `provideFormContext` 成对。同文件还带着 TanStack Vue Form 的 `useForm` / `useFormField`。

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

`useFormContext()` 给出 `FormContextValue`。没提供上下文时，行为和 Reka UI `createContext` 一样。

## provideFormContext

配对的 Provider，参数是 `FormContextValue`。

## useForm

从 `@tanstack/vue-form` 再导出，用来建表单。

## useFormField

也是再导出。源是 `useField`，这边叫 `useFormField`。

## Types

### `FormApi`

`CoreFormApi` 和 `VueFormApi`（都来自 `@tanstack/vue-form`）的交叉类型，拿来标表单实例。

### `FormValidationMode`

`'onSubmit' | 'onBlur' | 'onChange'`

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
