---
name: create-docs
description: >-
  Writes or syncs Slim docs, examples, Vitest files, and the matching
  registry item for a component or composable. Use when the user asks to
  generate or sync documentation. Do not use when implementing component
  or composable source.
---

# Create Docs

源码旁的 markdown、测试和（仅组件）`examples/*.vue` 就是文档，并同步到该 registry item 的 `kind: "doc"` / `"example"` / `"test"`。站点路由由 item 生成。本 skill 不写实现、不改渲染器、不安装包。

判定类型后再读对应契约，只凭本文件不够。

## 判定

| 输入                                     | 类型       | 接着读                         |
| ---------------------------------------- | ---------- | ------------------------------ |
| 组件目录                                 | 组件       | [component.md](component.md)   |
| composable 的 `.ts` / `.md` / `.test.ts` | composable | [composable.md](composable.md) |

用户只说 create-docs、未给路径时，按当前打开的文件或对话里的目录判定。两种都点名则各走一遍。

新 `type: "component"` 之后点名 `update-component-index` 补 glyph。

## 查阅

- 本 item 源码：组件读该目录下的 `.vue` / `.props.ts` / `.style.ts`；composable 读 `<name>.ts`。文件不存在则跳过。API 必须能在源码里核对；对不上就写「待补充」。Slim 是否透传某成员，只看本 item 源码。
- 上游文档（先单页，禁止灌全集）：
  - Reka UI：源码 `from 'reka-ui'` 时，打开 [llms.txt](https://reka-ui.com/llms.txt) 对上 slug，再取单页 `https://reka-ui.com/docs/components/<slug>.md` 或 `https://reka-ui.com/docs/utilities/<slug>.md`（如 `tooltip`、`config-provider`）。用于透传 props 的说明、默认值、Events、键盘。禁止抓 `llms-full.txt`。
  - 单页没有的字段，才用 Shell 读 `node_modules/<pkg>` 里的 `*Props`（工作区 Grep 扫不到依赖目录）。
  - 默认值：本组件 `withDefaults` / `*.style.ts` `defaultVariants` 优先，未设的才用上游文档或上游 `withDefaults`。
- registry / `files` / frontmatter：跑 `bun skills/create-docs/scripts/item.ts <name>`。它打印该 item、邻居、磁盘 vs `kind` 差、frontmatter vs `dependencies`，并在对齐时以退出码 0 结束。禁止 Read `registry.json` 全文。改 item 时按输出里的 `line` 做定点编辑或 StrReplace。
- 活范本只学结构，API 以本 item 源码为准。
- H2 / 表格解析拿不准时，才 Grep `buildComponentPage` 或 `parseMarkdown`。不预读整份渲染器。

## 模式

| 条件                              | 模式            |
| --------------------------------- | --------------- |
| 无文档，或用户要求生成 / 重新生成 | **A：首次生成** |
| 已有文档，或用户要求同步 API      | **B：API 同步** |

有文档且未说「重新生成」→ 默认 **B**。用户话术优先。两种模式结束前都同步 registry `files` 和测试。

- **A** 必写文档和测试。写简介时读 [prose.md](prose.md)。
- **B** 以源码更新 API 章节；默认保留简介、Installation、Usage、已有示例和测试。用户要求按行文重写简介时才读 [prose.md](prose.md)。API 变更让示例 / 测试失效，或文档新增了可核对的公开行为而测试缺失时，才改或补，并说明改了什么。

## 文档

H1 与 item `title` 一致。H2 只用对应契约列出的英文名（解析时大小写不敏感）。只输出有内容的章节。Installation 正文：

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/<name>
```

说明列用中文。Vue、TypeScript、UnoCSS、Reka UI、WAI-ARIA、Iconify、TanStack Form、CSS 变量名保持英文。类型、默认值、属性名、参数名、字段名、按键名用行内代码。联合类型的 `|` 写成 `\|`。字符串默认值加引号：`'md'`。布尔和数字不加：`true`、`0`。没有默认值写 `—`。透传但未逐项列出的成员，要点写进简介或某一行说明。

registry `description` 保持英文短句，默认不改。新 item 写一句英文 `description`。

## 外部依赖

item.`dependencies` 是该 item 源码直接用到的、且不在 registry 顶层共享列表里的 npm 包。同一列表写进文档 YAML frontmatter，作为文件第一段。没有独有包则整段 `---` 省略。只改一边视为未完成。`registryDependencies` 只写直接依赖的其它 item 名，不展开进 `dependencies` 或 frontmatter。页面 npm 芯片由渲染器按闭包计算。不要新增 `when: "on-init"`。

## registry item

在脚本输出的 item 上改，不重排整个 `items` 数组。新 item 按自然排序插到功能相近的已有 item 旁边（看 `neighbors` 和未找到时的 `names`：`button` 旁 `button-group`，`icon*` 一组，`link*` 一组，form composable 靠在一起）。`utils` 保持最前。

`files` 顺序：实现文件 → `kind: "doc"` → `kind: "example"` → `kind: "test"`。已有实现 path 保持不动。`files[].type` 与 item.`type` 一致。磁盘上的文档 / 示例 / 测试与这些 `kind` 一一对应；新增、删除、改名时两边一起改。不改与本次无关的 `description`、`registryDependencies`、`when`、`cssVars`。

## 测试

Vitest + `@vue/test-utils` + `vitest-axe`。只测源码里能核对的公开行为。顶层 `describe`：组件用 item `name`，composable 用主函数标识符。先写不依赖 DOM 的断言，再写 `describe('given a ...')`。`axe` 时 `attachTo: document.body`，结束 `unmount()`。class 断言对照 `*.style.ts` 的真实 class。巨型上游类型可用 `as any`。第三方再导出只测 `typeof fn === 'function'`。

```bash
bun run test src/components/<name>/<name>.test.ts
bun run test src/composables/<name>.test.ts
```

只跑当前 item 的测试文件。不要 `bun test`，不改 `vitest.config.ts`。

## 验证

- `bun skills/create-docs/scripts/item.ts <name>` 退出码 0（`kind` 与磁盘一致，frontmatter 与 `dependencies` 一致，JSON 合法）
- `bun run test <file>` 通过
