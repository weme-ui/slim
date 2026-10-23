---
name: create-docs
description: >-
  Writes or syncs Slim docs and Vitest files for components
  (src/components/<name>/) and composables (src/composables/<name>.ts):
  markdown, optional examples, *.test.ts, and registry.json. Treats
  registry.json as a first-class part of the docs and syncs every doc, example,
  or test change into its kind:doc, kind:example, and kind:test entries.
  Mirrors item dependencies into YAML frontmatter. Use when the user names
  create-docs, asks to add, generate, or sync documentation, examples, tests, or
  dependencies, or points at src/components/<name>/, src/composables/<name>.ts,
  README.md, a composable .md, examples/*.vue, *.test.ts, registry.json, or
  frontmatter.
---

# Create Docs

文档由源码旁的 markdown、`registry.json`、测试和（仅组件）`examples/*.vue` 一起生成，不要写 `docs/components/<name>.md` 或 `docs/composables/<name>.md`。

registry.json 是第一公民，所有变化都必须与它同步。

本 skill 写文档、示例与测试，并维护 registry 里对应的 doc / example / test 条目。不写实现，不改 `docs/.vitepress` 渲染器，不安装包。索引页 CSS sketch 也不在范围；`registry.json` 新增 `type: "component"` 之后，用 `skills/update-component-index` 补 glyph。

先判定类型，再读对应契约，不要只凭本文件写文档。测试契约见 [test.md](test.md)。

## 判定

| 输入                                             | 类型       | 必读                                               |
| ------------------------------------------------ | ---------- | -------------------------------------------------- |
| `src/components/<name>/`                         | 组件       | [component.md](component.md)、[test.md](test.md)   |
| `src/composables/<name>.ts`、`.md` 或 `.test.ts` | composable | [composable.md](composable.md)、[test.md](test.md) |

用户只说 create-docs、未给路径时，按当前打开的文件或对话里的目录判定。两种都点名则各走一遍。

## 编写前必读

组件：

```text
src/components/<name>/*.vue
src/components/<name>/*.props.ts
src/components/<name>/*.style.ts
src/components/<name>/README.md
src/components/<name>/examples/*.vue
src/components/<name>/<name>.test.ts
registry.json
```

composable：

```text
src/composables/<name>.ts
src/composables/<name>.md
src/composables/<name>.test.ts
registry.json
```

文件不存在则跳过。API、默认值、插槽、返回值、类型必须能在源码里核对；对不上就写「待补充」，不要编造。

某段会不会出现在页面上拿不准时，再读渲染契约：

```text
docs/.vitepress/lib/registry.ts
docs/.vitepress/lib/markdown.ts
docs/.vitepress/theme/components/ComponentDoc.vue
```

当前站点只按 `type: "component"` 生成 `/components/<name>`。composable 仍按契约写 markdown 并登记 registry，不为此改渲染器。

## 模式

| 条件                                                                                  | 模式            |
| ------------------------------------------------------------------------------------- | --------------- |
| 无文档（组件无 README，composable 无 `<name>.md`），或用户明确要求「生成 / 重新生成」 | **A：首次生成** |
| 已有文档，或用户要求同步 API（Props / Slots / Events / Parameters / Returns / Types） | **B：API 同步** |

有文档且未说「重新生成」→ 默认 **B**。用户话术优先。

两种模式都在结束前同步 `registry.json` 和测试。组件细节见 [component.md](component.md)，composable 细节见 [composable.md](composable.md)，测试见 [test.md](test.md)。

## 共用约定

- 有 item.`dependencies` 时才保留文档顶部 YAML frontmatter，包名和顺序与 registry 一致。没有外部依赖时删掉整段 `---`。
- H1 与 registry `title` 一致。简介用中文。registry `description` 保持英文短句，本 skill 默认不改它。新 item 写一句英文 `description`。
- 说明列用中文。Vue、TypeScript、UnoCSS、Reka UI、WAI-ARIA、Iconify、TanStack Form、CSS 变量名保持英文。
- 类型、默认值、属性名、参数名、字段名、按键名用行内代码。联合类型里的 `|` 写成 `\|`。
- 字符串默认值加引号：`'button'`、`'md'`。布尔和数字不加引号：`true`、`0`。没有默认值写 em dash：`—`。
- 透传但未逐项列出的成员，把要点写进简介或某一行说明。不要只写在表格后面。
- 不要写 Examples、Files、Preview、Source、CSS Variables 这些由 registry / 渲染器生成的章节。

## 外部依赖

item.`dependencies` 是该 item 独有的外部 npm 包。维护 `registry.json` 时，把同一列表写进文档 YAML frontmatter，字段名 `dependencies`。它必须是文件的第一段，格式遵循 [VitePress frontmatter](https://vitepress.dev/guide/frontmatter)：

```yaml
---
dependencies:
  - '@iconify/vue'
---
```

`docs/` 读取这段 frontmatter，显示在标题下方。不要在正文写 `## Dependencies`。

- 包名、顺序与 item.`dependencies` 一致。只改 registry 或只改 frontmatter 都视为未完成。
- 没有 item.`dependencies` 时不要写这个字段；没有其它 frontmatter 时整段省略。
- 不收录 registry 顶层 `dependencies`，也不收录 `registryDependencies`。
- 顶层已有的包不要再写入 item.`dependencies`。只有该 item 独有的包才两边一起加，例如 Icon 的 `@iconify/vue`、`use-form-context` 的 `@tanstack/vue-form`。不要新增 `when: "on-init"`。

范本：`src/components/icon/README.md`。Button 没有外部依赖，不以 frontmatter 开头。

## registry.json

不要以字母排序，使用自然排序，相近功能排在一起。

`items` 顺序即同一 `docs.category` 内的侧栏顺序。新增 item 插到功能相近的已有 item 旁边（`button` / `button-group`，`icon` / `icon-stack` / `icon-tile` / `animated-toggle-icon`，`link` / `link-overlay`，form 相关 composable 靠在一起）。`utils` 保持最前。不要按 `name` 字母序插入或重排整个数组。

磁盘上的文档、示例、测试与 item.`files` 里的 `kind: "doc"`、`kind: "example"`、`kind: "test"` 一一对应。新增、删除、改名、调整展示顺序时，同时改文件和 `registry.json`。只改一边视为未完成。

`files` 顺序：实现文件 → `kind: "doc"` → `kind: "example"` → `kind: "test"`。已有实现文件 path 保持不动。组件的 `usage.vue` 是第一条 example。测试必须有 `kind: "test"`。

`files[].type` 与 item.`type` 一致：组件用 `"component"`，composable 用 `"composable"`。

其它 registry item 用 `registryDependencies`。外部 npm 包见「外部依赖」。

## 验证

验证时通过工具读生成的文档，不要跑 dev server。`registry.json` 必须仍是合法 JSON。

组件核对应 [component.md](component.md) 的「验证」。composable 核对应 [composable.md](composable.md) 的「验证」。测试核对应 [test.md](test.md) 的「验证」：`bun run test <file>`，不要 `bun test`。

## 相关

- 组件契约：[component.md](component.md)
- composable 契约：[composable.md](composable.md)
- 测试契约：[test.md](test.md)
- 组件索引 glyph：`skills/update-component-index`
