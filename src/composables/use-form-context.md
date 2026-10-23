---
dependencies:
  - '@tanstack/vue-form'
---

# useFormContext

日常用 `<Form>` 就够。这个 composable 是 Form Context，以及 `useForm` / `useFormField` 的再导出。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/use-form-context
```

## Usage

```ts
import {
  useFormContext,
  useFormField,
} from '~/composables/use-form-context'

const { form, loading, disabled, validationMode, serverErrors } = useFormContext()
const field = useFormField({ name: 'email', form })
```

## Returns

`useFormContext()` 给出 `FormContextValue`。没提供上下文时，行为和 Reka UI `createContext` 一样。

## provideFormContext

配对的 Provider，参数是 `FormContextValue`。`<Form>` 内部会调用。

## useForm

从 `@tanstack/vue-form` 再导出。日常交给 `<Form>`；不经过 `<Form>` 时再自己建。

## useFormField

也是再导出。源是 `useField`，这边叫 `useFormField`。

## Types

### `FormApi`

`CoreFormApi` 和 `VueFormApi`（都来自 `@tanstack/vue-form`）的交叉类型。参数已擦成 `any`。`<Form>` 内部 `provide` 时断言成这个类型。

### `FormValidationMode`

`'onSubmit' | 'onBlur' | 'onChange'`

有 schema 时，`<Form>` 把它映射到 TanStack `validators`：`onSubmit` 只挂提交；`onBlur` / `onChange` 额外挂对应 key，提交仍校验。无 schema 时不传 `validators`。

### `FormRegisteredField`

| 字段                | 类型                             | 说明                   |
| ------------------- | -------------------------------- | ---------------------- |
| `name`              | `Ref<string \| undefined>`       | 字段名                 |
| `invalid`           | `ComputedRef<boolean>`           | 是否无效               |
| `getValue`          | `() => unknown`                  | 读取当前值             |
| `getControlElement` | `() => HTMLElement \| undefined` | 控件 DOM（用于聚焦等） |
| `resetField`        | `() => void`                     | 重置该字段             |

### `FormContextValue`

| 字段             | 类型                                              | 说明                           |
| ---------------- | ------------------------------------------------- | ------------------------------ |
| `serverErrors`   | `ComputedRef<Record<string, string \| string[]>>` | 服务端 / 外部错误（按字段名）  |
| `validationMode` | `Ref<FormValidationMode>`                         | 初始校验时机（字段组件不读它） |
| `disabled`       | `Ref<boolean>`                                    | 是否禁用                       |
| `loading`        | `Ref<boolean>`                                    | 是否加载中                     |
| `form`           | `FormApi`                                         | 擦掉参数的表单 API             |
| `getValues`      | `() => Record<string, unknown>`                   | 读取当前已注册字段的值         |
| `registerField`  | `(field: FormRegisteredField) => () => void`      | 注册字段；返回取消注册函数     |
