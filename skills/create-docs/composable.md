# Composable

从 `create-docs` 的 SKILL.md 判定为 composable 后再读本文件。

源码范本：`src/composables/use-form-context.ts`。结构范本：`src/composables/use-form-context.md`。规则与范本冲突时以本文件为准（例如独有 npm 依赖必须写进 frontmatter 与 item.`dependencies`）。

composable 文档有三份材料（默认没有 Vue 示例）：

- `registry.json` 里 `type: "composable"` 的 item
- `src/composables/<name>.md`（`kind: "doc"`），与 `src/composables/<name>.ts` 同目录、同 stem
- `src/composables/<name>.test.ts`（`kind: "test"`）

不要把 composable 改成 `src/composables/<name>/README.md`。不要为它创建 `examples/`，除非用户明确要求可预览的 Vue 示例。测试契约见 [test.md](test.md)，范本 `src/composables/use-form-context.test.ts`。

## 模式

### A：首次生成

1. 从源码列出：主函数（文件名对应的 camelCase 导出）、参数、返回值、其它公开导出（含 `export { x as y }` 再导出）、导出的 `type` / `interface`。
2. 写 `src/composables/<name>.md`。不要写 Examples、Files、Preview、Source、CSS Variables，也不要写组件用的 Props / Events / Slots / Accessibility。
3. Usage 必须是 markdown 里的 `ts` 代码块，不要留空。
4. 按 [test.md](test.md) 写 `src/composables/<name>.test.ts`。
5. 把 `.md` 和测试同步进该 item 的 `files`（`kind: "doc"`、`kind: "test"`）。
6. `title` 与 H1 一致，取主函数标识符（`use-form-context` → `useFormContext`）。没有 `meta.docs.category` 时补 `composables` / `Composables`，除非用户指定或已有同组。按 SKILL.md「外部依赖」写 frontmatter。新 item 按自然排序插入；form 相关靠在一起。不改与本次文档无关的 `description`、`registryDependencies`、`when`、`cssVars`，也不改实现文件 path。

### B：API 同步

以源码为准更新 `.md` 的 API 章节：

- 主函数有参数 → 写入或更新 `## Parameters`；没有则删除
- 主函数有可描述的返回值 → 写入或更新 `## Returns`；没有则删除
- 其它公开导出（含再导出）→ 每个一节 `## <exportName>`；源码没有的导出从文档删除
- 有导出的 `type` / `interface` → 写入或更新 `## Types`；没有则删除
- 不要补 Props / Events / Slots / Accessibility

默认保留简介、`## Installation`、`## Usage` 和已有测试。只有用户明确要求，或 API 变更让 Usage / 测试明显失效时，才改 Usage 或测试。失效时可以改对应文件，并说明改了什么。文档新增了可核对的公开行为而测试缺失时，按 [test.md](test.md) 补上。

核对 `files`：已有 `.md` 必须有 `kind: "doc"`，已有 `.test.ts` 必须有 `kind: "test"`；若存在用户要求的 example，必须有 `kind: "example"`。已删除或改名的文件必须改掉。并核对 frontmatter `dependencies` 与 item.`dependencies` 一致。

## 页面契约

markdown 即文档正文（与组件不同：`## Usage` 会渲染代码块，不是 `usage.vue`）。建议顺序：

`Installation` → `Usage` → `Parameters` → `Returns` → 其它导出（各一节）→ `Types`

| markdown / registry                                  | 含义                                                                                |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| H1 与第一个 `##` 之间的段落                          | 简介                                                                                |
| item.`dependencies` + 沿 `registryDependencies` 递归 | 标题下的外部 npm 芯片（闭包，去重）。frontmatter 只镜像本 item 独有的包             |
| `## Installation` 正文                               | Installation。缺省时与组件相同：`pnpm dlx @weme-ui/weme-ui add weme-ui/slim/<name>` |
| `## Usage` 里的 `ts` 代码块                          | 最小用法                                                                            |
| `## Parameters` 的第一张表                           | 主函数参数                                                                          |
| `## Returns`                                         | 主函数返回值（句子和/或表）                                                         |
| 其它 `## <exportName>`                               | 同文件的其它公开导出                                                                |
| `## Types` 下每个 `###`                              | 导出类型。对象类型用表                                                              |
| 无 `kind`，或 `kind: "file"` 的 path                 | Files。`doc` / `example` / `test` 不进 Files                                        |

固定 H2（解析时大小写不敏感）：`Installation`、`Usage`、`Parameters`、`Returns`、`Types`。其它导出的 H2 必须与源码导出标识符完全一致（如 `provideFormContext`、`useForm`、`useFormField`）。

只输出有内容的章节。不要空的 Parameters / Returns / Types。

## 文档模板

````markdown
---
dependencies:
  - '@tanstack/vue-form'
---

# useFormContext

<按 SKILL.md「行文」写的中文简介。>

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

### `FormValidationMode`

`'onSubmit' \| 'onBlur' \| 'onChange'`

### `FormRegisteredField`

| 字段      | 类型                       | 说明     |
| --------- | -------------------------- | -------- |
| `name`    | `Ref<string \| undefined>` | 字段名   |
| `invalid` | `ComputedRef<boolean>`     | 是否无效 |
````

约定：

- H1 / `title` 用主函数 camelCase，不要写成 `Use Form Context`。
- Usage 从 `~/composables/<name>` 导入，与仓库 alias 一致。不要编造发布后的包路径。只演示最小调用，不要在代码块里写标题或长注释。
- `createContext` 成对导出时，消费函数做 H1，`provide*` 做独立 H2。
- 再导出只写来源包与别名，不要把上游 API 整表抄进来。
- 主函数无参数 → 不写 `## Parameters`。有参数时用表：

| 参数      | 说明   | 类型            | 默认值 |
| --------- | ------ | --------------- | ------ |
| `options` | 配置项 | `UseFooOptions` | —      |

- 返回值是具名类型 → Returns 用一两句话指向该类型，字段放到 `## Types`。返回值是匿名对象且不再导出类型 → Returns 用表（列名：`字段` / `类型` / `说明`）。
- `## Types` 只收录源码 `export` 的 `type` / `interface`。未导出的（如仅用于构造 `FormApi` 的 `CoreFormApi`）不写。
- 对象类型用 `### \`TypeName\``+ 表，列名固定`字段`/`类型`/`说明`。字段顺序与源码声明一致。
- 别名或联合类型用 `###` 下一行行内代码写出，不必强行建表。
- 不要写 `## Props`、`## Events`、`## Slots`、`## Accessibility`。composable 不负责 DOM 无障碍，除非源码本身设置了可核对的 `aria-*` / `role`。

## registry.json

```json
{
  "name": "use-form-context",
  "type": "composable",
  "title": "useFormContext",
  "description": "Form context helpers based on Reka UI createContext.",
  "meta": {
    "docs.category": "composables",
    "docs.categoryLabel": "Composables"
  },
  "dependencies": [
    "@tanstack/vue-form"
  ],
  "files": [
    {
      "type": "composable",
      "path": "src/composables/use-form-context.ts"
    },
    {
      "type": "composable",
      "kind": "doc",
      "path": "src/composables/use-form-context.md"
    },
    {
      "type": "composable",
      "kind": "test",
      "path": "src/composables/use-form-context.test.ts"
    }
  ]
}
```

`files` 顺序：实现 `.ts` → `kind: "doc"` → `kind: "example"`（若有）→ `kind: "test"`。已有实现文件 path 保持不动。测试契约见 [test.md](test.md)。

## 验证

读 `src/composables/<name>.md`、`src/composables/<name>.test.ts` 和 `registry.json` 里对应 item，核对：

- item.`type` 为 `"composable"`；H1 与 `title` 都是主函数标识符
- `.md` 的 H2 符合本文件契约；没有空的 Parameters / Returns / Types；没有组件用的 Props / Events / Slots
- `src/composables/<name>.md` 有 `kind: "doc"`，`<name>.test.ts` 有 `kind: "test"`，没有指向已删除文件的条目
- frontmatter `dependencies` 与 item.`dependencies` 一致（仅本 item 独有的 npm 包，不展开 `registryDependencies`）；没有独有外部依赖时没有这段 frontmatter
- Usage 能从 `~/composables/<name>` 导入源码里真实存在的导出
- 每个 `## <exportName>` 和 `### \`TypeName\``都能在源码里找到对应`export`
- `bun run test src/composables/<name>.test.ts` 通过（不要 `bun test`）
