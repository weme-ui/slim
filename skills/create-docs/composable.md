# Composable

判定为 composable 后再读。结构跟 `src/composables/use-form-context.md`，只学结构，API 以本 item 源码为准。

路径：`src/composables/<name>.md` 与 `<name>.ts` 同目录、同 stem。默认没有 `examples/`，除非用户要求可预览的 Vue 示例。没有 `meta.docs.category` 时补 `composables` / `Composables`。

## H1 / H2

H1 与 `title` 用主函数 camelCase（`use-form-context` → `useFormContext`）。

`Installation`、`Usage`、`Parameters`、`Returns`、`Types`。其它公开导出（含 `export { x as y }`）各一节，H2 与源码导出标识符完全一致。

- `Usage` 必须是 markdown 里的 `ts` 代码块：从 `~/composables/<name>` 导入真实存在的导出，只演示最小调用。
- 主函数有参数 → `Parameters` 表（列：参数 / 说明 / 类型 / 默认值）。无参数则不写该章。
- 返回值是具名类型 → `Returns` 用一两句话指向该类型，字段放到 `Types`。返回值是匿名对象且不再导出类型 → `Returns` 用表（列：字段 / 类型 / 说明）。
- `createContext` 成对导出时，消费函数做 H1，`provide*` 做独立 H2。
- 再导出只写来源包与别名。
- `Types` 只收录源码 `export` 的 `type` / `interface`。对象类型用 `### \`TypeName\``+ 表（列：字段 / 类型 / 说明），字段顺序与源码一致。别名或联合类型用`###` 下一行行内代码写出。
- 空章删除。H2 用本文件列出的这些名字；组件用的 Props / Events / Slots / Accessibility 不出现。

## 测试

范本 `src/composables/use-form-context.test.ts`。

1. 再导出（若有）是函数
2. `createContext` 成对时：provide 之后子孙能读到。Consumer 用 render 函数把值写到 `data-*`。
