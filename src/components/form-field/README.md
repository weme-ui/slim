# Form Field

字段的壳。必须包在 `Form` 里。标签、说明、错误都在这儿，控件从 Context 拿 `id` / `aria-*` / `data-*`。校验时机由 Form 的 `schema` 和 `validationMode` 决定，本组件不读 mode。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/form-field
```

## Usage

## Props

| 属性          | 说明                                                                                                                                  | 类型                           | 默认值       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------ |
| `as`          | 渲染为的元素或组件（Reka UI `Primitive`）                                                                                             | `AsTag \| Component`           | —            |
| `asChild`     | 合并到子元素上渲染（Reka UI composition）                                                                                             | `boolean`                      | —            |
| `name`        | TanStack Form 字段名                                                                                                                  | `string`                       | —            |
| `label`       | 标签文案                                                                                                                              | `string`                       | —            |
| `description` | 标签下方的说明                                                                                                                        | `string`                       | —            |
| `hint`        | 标签旁的提示                                                                                                                          | `string`                       | —            |
| `help`        | 控件下方的帮助；字段无效时隐藏                                                                                                        | `string`                       | —            |
| `orientation` | 布局方向                                                                                                                              | `'horizontal' \| 'vertical'`   | `'vertical'` |
| `nativeLabel` | 是否用原生 `label[for]` 关联控件；为 `false` 时点击标签改为聚焦控件                                                                   | `boolean`                      | `true`       |
| `required`    | 是否必填（显示必填标记，并写入 Context）                                                                                              | `boolean`                      | —            |
| `disabled`    | 是否禁用；未传时用 Form Context                                                                                                       | `boolean`                      | —            |
| `loading`     | 是否加载中；未传时用 Form Context                                                                                                     | `boolean`                      | —            |
| `invalid`     | 强制无效；为真或字段 `meta.isValid === false` 时视为无效                                                                              | `boolean`                      | —            |
| `class`       | 根节点额外 class                                                                                                                      | `any`                          | —            |
| `ui`          | 覆盖 slots 样式（`root` / `header` / `labelWrapper` / `label` / `description` / `required` / `content` / `hint` / `help` / `errors`） | `Partial<FormFieldStyleSlots>` | —            |

## Slots

| 插槽          | 说明                                                                                    |
| ------------- | --------------------------------------------------------------------------------------- |
| `default`     | 字段控件；作用域参数：`{ field, orientation }`（`field` 为 TanStack `useField` 返回值） |
| `label`       | 自定义标签；未传时回退到 `label` prop                                                   |
| `hint`        | 自定义标签旁提示；未传时回退到 `hint` prop                                              |
| `description` | 自定义说明；未传时回退到 `description` prop                                             |
| `required`    | 自定义必填标记；默认 `*`                                                                |
| `errors`      | 自定义错误区；作用域参数：`{ errors }`（字段 `meta.errors`）                            |
| `help`        | 自定义帮助文案；未传时回退到 `help` prop（仅在未无效时展示）                            |

## Accessibility

根节点 `data-slot="form-field"`，并带字段状态 `data-*` 与 `data-orientation`。标签是 Reka UI `Label`：`nativeLabel` 为 `true` 时 `for` 指向已注册控件 `id`。子控件用 `useFormFieldBindings` 合并 `aria-labelledby`、`aria-describedby`、`aria-invalid`。
