---
name: create-docs
description: >-
  Writes or syncs Slim docs and Vitest files for components
  (src/components/<name>/) and composables (src/composables/<name>.ts):
  markdown, optional examples, *.test.ts, and registry.json. Treats
  registry.json as a first-class part of the docs and syncs every doc, example,
  or test change into its kind:doc, kind:example, and kind:test entries.
  Mirrors item dependencies into YAML frontmatter. Page npm chips are the
  transitive closure of item.dependencies walked through registryDependencies.
  Chinese prose uses Naive UI-style spoken copy. Use when the user names
  create-docs, asks to add, generate, or sync documentation, examples, tests,
  dependencies, or registryDependencies, or points at src/components/<name>/,
  src/composables/<name>.ts, README.md, a composable .md, examples/*.vue,
  *.test.ts, registry.json, frontmatter, or docs/get-started/.
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

VitePress 用 `/components/<name>` 渲染组件，用 `/composables/<name>` 渲染 composable。侧栏共用：General → 其它分类 → Utilities → Composables。不改渲染器结构，除非用户明确要求扩展页面。

## 模式

| 条件                                                                                  | 模式            |
| ------------------------------------------------------------------------------------- | --------------- |
| 无文档（组件无 README，composable 无 `<name>.md`），或用户明确要求「生成 / 重新生成」 | **A：首次生成** |
| 已有文档，或用户要求同步 API（Props / Slots / Events / Parameters / Returns / Types） | **B：API 同步** |

有文档且未说「重新生成」→ 默认 **B**。用户话术优先。

两种模式都在结束前同步 `registry.json` 和测试。组件细节见 [component.md](component.md)，composable 细节见 [composable.md](composable.md)，测试见 [test.md](test.md)。

## 共用约定

- 有 item.`dependencies` 时才保留文档顶部 YAML frontmatter，包名和顺序与 registry 一致。没有外部依赖时删掉整段 `---`。
- H1 与 registry `title` 一致。简介用中文，按「行文」。registry `description` 保持英文短句，本 skill 默认不改它。新 item 写一句英文 `description`。
- 说明列用中文。Vue、TypeScript、UnoCSS、Reka UI、WAI-ARIA、Iconify、TanStack Form、CSS 变量名保持英文。
- 类型、默认值、属性名、参数名、字段名、按键名用行内代码。联合类型里的 `|` 写成 `\|`。
- 字符串默认值加引号：`'button'`、`'md'`。布尔和数字不加引号：`true`、`0`。没有默认值写 em dash：`—`。
- 透传但未逐项列出的成员，把要点写进简介或某一行说明。不要只写在表格后面。
- 不要写 Examples、Files、Preview、Source、CSS Variables 这些由 registry / 渲染器生成的章节。

## 行文

中文说明学 [Naive UI 介绍页](https://www.naiveui.com/zh-CN/os-theme/docs/introduction)：短、白、像作者在说话。适用于 README / composable `.md` 的简介、Accessibility 正文、以及 `docs/get-started/` 这类说明页。

- 标题说事实，不写口号。用「UnoCSS」「还早」，不用「UnoCSS 收得住」「别再跟库拔河」。
- 句子短。第一人称可以有（「我尽力了」），不要第三身产品通稿。
- 指用户的代码用「项目」，不要用「仓库」代指。
- 少比喻。价值一句话说完，不要「定制权」「外围覆盖」「控制权交还」。
- 「顺便一提」一类旁白整页至多一次，用在真正容易踩坑的地方。
- Props / Slots / Returns 等表的说明列保持短说明，不要写成聊天。
- 模式 B 默认不动已有简介。用户要求按行文重写，或首次生成，才写简介。

对照：

| 不要写                                               | 写成                                                           |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| 可复用的 Vue 组件 registry，基于 Reka UI 与 UnoCSS。 | 一套 Vue 组件，用 Reka UI 和 UnoCSS 做的。源码会写进你的项目。 |
| 目前仍处于早期开发，不建议用于生产环境。             | 我尽力了，但现在别用在生产上。                                 |
| 组件以源码写入你的项目，而不是作为运行时包引入。     | 源码会写进你的项目。                                           |
| 默认路径与本仓库一致                                 | 默认路径是                                                     |

范本：`docs/get-started/index.md`、首页 Features 文案（`docs/.vitepress/theme/components/HomePage.vue` 里的 `features` 与导语）。

## 外部依赖

item.`dependencies` 是该 item **自己源码直接用到的**外部 npm 包。维护 `registry.json` 时，把同一列表写进文档 YAML frontmatter，字段名 `dependencies`。它必须是文件的第一段，格式遵循 [VitePress frontmatter](https://vitepress.dev/guide/frontmatter)：

```yaml
---
dependencies:
  - '@iconify/vue'
---
```

不要在正文写 `## Dependencies`。

### 写入（registry / frontmatter）

- 包名、顺序与 item.`dependencies` 一致。只改 registry 或只改 frontmatter 都视为未完成。
- 没有 item.`dependencies` 时不要写这个字段；没有其它 frontmatter 时整段省略。
- 不收录 registry 顶层 `dependencies`（`vue`、`reka-ui` 等整库共享包）。
- 顶层已有的包不要再写入 item.`dependencies`。只有该 item 独有的包才两边一起加，例如 Icon 的 `@iconify/vue`、`use-form-context` 的 `@tanstack/vue-form`、Animated Toggle Icon 的 `motion-v`、Link 的 `vue-router`。不要新增 `when: "on-init"`。
- **不要**把 `registryDependencies` 展开写进 item.`dependencies` 或 frontmatter。Button 依赖 Icon，仍然只写 `registryDependencies: ["icon"]`，README 不以 frontmatter 开头。

### 页面展示（闭包）

文档页标题下的 npm 芯片由渲染器计算，不是 frontmatter 原文：

1. 先收录本 item.`dependencies`（顺序保留）。
2. 再按书写顺序遍历 `registryDependencies`，对每个能在 `registry.json` `items` 里找到的 item **递归**执行同一规则。
3. 包名去重，先出现的保留。环（A → B → A）跳过已访问 item。
4. 找不到的 `registryDependencies` 名称忽略。frontmatter 里多出来的包名追加在闭包末尾。

因此 Empty（`icon-tile` → `icon`）和 Button（`icon`）页面都会显示 `@iconify/vue`；Animated Toggle Icon 显示 `motion-v`、`@iconify/vue`。核对页面时按这个闭包，不要为了「页面上看得到」去改 Button / Empty 的 frontmatter。

## registry.json

不要以字母排序，使用自然排序，相近功能排在一起。

`items` 顺序即同一 `docs.category` 内的侧栏顺序。新增 item 插到功能相近的已有 item 旁边（`button` / `button-group`，`icon` / `icon-stack` / `icon-tile` / `animated-toggle-icon`，`link` / `link-overlay`，form 相关 composable 靠在一起）。`utils` 保持最前。不要按 `name` 字母序插入或重排整个数组。

磁盘上的文档、示例、测试与 item.`files` 里的 `kind: "doc"`、`kind: "example"`、`kind: "test"` 一一对应。新增、删除、改名、调整展示顺序时，同时改文件和 `registry.json`。只改一边视为未完成。

`files` 顺序：实现文件 → `kind: "doc"` → `kind: "example"` → `kind: "test"`。已有实现文件 path 保持不动。组件的 `usage.vue` 是第一条 example。测试必须有 `kind: "test"`。

`files[].type` 与 item.`type` 一致：组件用 `"component"`，composable 用 `"composable"`。

其它 registry item 用 `registryDependencies`（只写直接依赖，不要展开闭包）。外部 npm 包见「外部依赖」。

## 验证

验证时通过工具读生成的文档，不要跑 dev server。`registry.json` 必须仍是合法 JSON。

组件核对应 [component.md](component.md) 的「验证」。composable 核对应 [composable.md](composable.md) 的「验证」。测试核对应 [test.md](test.md) 的「验证」：`bun run test <file>`，不要 `bun test`。

## 相关

- 组件契约：[component.md](component.md)
- composable 契约：[composable.md](composable.md)
- 测试契约：[test.md](test.md)
- 组件索引 glyph：`skills/update-component-index`
