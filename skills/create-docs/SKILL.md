---
name: create-docs
description: >-
  Writes or syncs Slim component docs from src/components/<name>: README.md,
  examples/*.vue, and registry.json. Treats registry.json as a first-class part
  of the docs and syncs every doc or example change into its kind:doc and
  kind:example entries. Mirrors item dependencies into README YAML frontmatter
  for the docs site. Use when the user names create-docs, asks to add, generate,
  or sync component documentation, examples, or dependencies, or points at
  src/components/<name>/, README.md, examples/*.vue, registry.json, or frontmatter.
---

# Create Docs

组件文档有三份材料，页面由它们一起生成，而不是 `docs/components/<name>.md`：

- `registry.json` 里 `type: "component"` 的 item（侧栏、示例顺序、CSS Variables、Files）
- `src/components/<name>/README.md`（`kind: "doc"`）
- `src/components/<name>/examples/*.vue`（`kind: "example"`）

registry.json 也是文档的重要组成部分，属于第一公民，所有变化都必须与 registry.json 同步。

VitePress 用动态路由 `/components/<name>` 读取这三份数据。本 skill 只写文档与示例，并维护 registry 里对应的 doc / example 条目。不写组件实现，不生成测试，不改 `docs/.vitepress` 渲染器，不安装包。索引页 CSS sketch（`ComponentGlyph.vue`）也不在范围；`registry.json` 新增 `type: "component"` 之后，用 `skills/update-component-index` 补 glyph。

范本：`src/components/button/`、`src/components/icon/`。

## 输入

```text
src/components/<name>/
```

## 编写前必读

```text
src/components/<name>/*.vue
src/components/<name>/*.props.ts
src/components/<name>/*.style.ts
src/components/<name>/README.md
src/components/<name>/examples/*.vue
registry.json
```

文件不存在则跳过。Props、默认值、插槽、无障碍属性必须能在这些源码里核对；对不上就写「待补充」，不要编造。

渲染契约（某段会不会出现在页面上拿不准时再读）：

```text
docs/.vitepress/lib/registry.ts
docs/.vitepress/lib/markdown.ts
docs/.vitepress/theme/components/ComponentDoc.vue
```

## 模式

| 条件                                                                         | 模式            |
| ---------------------------------------------------------------------------- | --------------- |
| 无 README，或用户明确要求「生成 / 重新生成」                                 | **A：首次生成** |
| 已有 README，或用户要求「同步属性 / Props / Slots / Events / Accessibility」 | **B：API 同步** |

有 README 且未说「重新生成」→ 默认 **B**。用户话术优先。

两种模式都在结束前同步 `registry.json`。规则见下方「registry.json」。

### A：首次生成

1. 从源码列出 Props、Emits、Slots、可核对的 Accessibility / Keyboard Interactions，以及值得单独演示的属性或状态。
2. 写同目录 `README.md`。不要写 Examples、Files、Preview、Source、CSS Variables。
3. 按场景写 `examples/<feature>.vue`。`usage.vue` 必有。
4. 把 README 和每个示例同步进该 item 的 `files`。示例登记顺序即页面顺序，`usage.vue` 放第一个。
5. `title` 与 README 的 H1 保持一致。没有 `meta.docs.category` 时补上，与同组组件一致（当前为 `general` / `General`），除非用户指定了分类。按「外部依赖」把 item.`dependencies` 写进 README frontmatter。新 item 按「registry.json」的自然排序插入，不要按字母序。不改与本次文档无关的 `description`、`registryDependencies`、`when`、`cssVars`，也不改实现文件和 test 的 path。

### B：API 同步

以源码为准更新 README 的 API 章节：

- 始终同步 `## Props`
- 源码有 `defineEmits` / `emit()` → 写入或更新 `## Events`；没有则删除该章。回调 prop（如 `onClick`）留在 Props
- 模板有具名或默认 slot → 写入或更新 `## Slots`；没有则删除
- 能核对到无障碍行为 → 写入或更新 `## Accessibility`；没有则删除整章（含 `### Keyboard Interactions`）
- 能核对到键盘行为 → 在 Accessibility 下写入或更新 `### Keyboard Interactions`；没有则删除该小节

默认保留简介、`## Installation`、`## Usage` 和已有 `examples/*.vue`。只有用户明确要求，或 API 变更让示例明显失效时，才改 Usage 或增删示例。失效时可以改对应示例，并说明改了什么。

无论示例文件是否改动，都要核对 `files`：已有 README / 示例必须有对应条目，已删除或改名的文件必须从 `kind: "doc"` / `kind: "example"` 中去掉或改 path。展示顺序以 `files` 里 example 的顺序为准。并核对 README frontmatter 的 `dependencies` 与 item.`dependencies` 一致。

## 页面上实际会出现的内容

详情页顺序固定为：

`Installation` → `Usage` → `Examples` → `Props` → `Events` → `Slots` → `CSS Variables` → `Accessibility` → `Files`

| README / registry                                    | 页面                                                                           |
| ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| H1 与第一个 `##` 之间的段落                          | 标题下的简介                                                                   |
| frontmatter `dependencies`                           | 标题下的外部依赖。没有该字段则不显示                                           |
| `## Installation` 正文                               | Installation。缺省时站点用 `pnpm dlx @weme-ui/weme-ui add weme-ui/slim/<name>` |
| `examples/usage.vue`                                 | Usage 预览。`## Usage` 正文不渲染，留空                                        |
| 其余 `kind: "example"`，按 `registry.json` 顺序      | Examples。小节标题由文件名生成                                                 |
| `## Props` / `## Events` / `## Slots` 的**第一张表** | 对应 API 表。表后的段落不渲染                                                  |
| item.`cssVars` 非空                                  | CSS Variables。不要在 README 里写这一章                                        |
| `## Accessibility` 里第一个 `###` 之前的正文         | Accessibility 说明                                                             |
| `### Keyboard Interactions` 的第一张表               | 键盘表。其它 `###` 不渲染                                                      |
| 无 `kind`，或 `kind: "file"` 的 path                 | Files。`doc` / `example` / `test` 不进 Files                                   |

H2 标题必须是这些英文名（解析时大小写不敏感）：`Installation`、`Usage`、`Props`、`Events`、`Slots`、`Accessibility`。键盘小节标题必须是 `Keyboard Interactions`。

## README

只输出有内容的章节。Props 必有。顺序：

````markdown
---
dependencies:
  - '@iconify/vue'
---

# <Title>

<一句话中文简介，说明组件做什么。>

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/<name>
```

## Usage

## Props

| 属性      | 说明     | 类型                       | 默认值      |
| --------- | -------- | -------------------------- | ----------- |
| `variant` | 外观变体 | `'primary' \| 'secondary'` | `'primary'` |

## Slots

| 插槽      | 说明                                |
| --------- | ----------------------------------- |
| `default` | 自定义文案，作用域参数：`{ label }` |

## Accessibility

默认渲染为原生 `button`（Reka UI `Primitive`），并暴露 `aria-pressed`（按下）。

### Keyboard Interactions

| Key     | Description                         |
| ------- | ----------------------------------- |
| `Enter` | 激活按钮（`as` 为原生 `button` 时） |
| `Space` | 激活按钮（`as` 为原生 `button` 时） |
````

约定：

- 有 item.`dependencies` 时才保留模板顶部的 frontmatter，包名和顺序与 registry 一致。没有外部依赖时删掉整段 `---`。
- H1 与 registry `title` 一致（如 `Button`）。简介用中文。registry `description` 保持英文短句，本 skill 默认不改它。
- 说明列用中文。Vue、TypeScript、UnoCSS、Reka UI、WAI-ARIA、Iconify、CSS 变量名保持英文。
- 类型、默认值、属性名、按键名用行内代码。联合类型里的 `|` 写成 `\|`。
- 字符串默认值加引号：`'button'`、`'md'`。布尔和数字不加引号：`true`、`0`。没有默认值写 em dash：`—`。
- 默认值同时对照 `withDefaults` 和 `*.style.ts` 的 `defaultVariants`，写用户实际得到的值。
- 公开 props 来自 `*.props.ts`。继承的 Reka `PrimitiveProps`（如 `as`、`asChild`）若组件确实透传，也列入表。
- 插槽说明写清作用域参数，与模板里的 `v-bind` / slot props 一致。
- 透传但未逐项列出的属性，把要点写进简介或某一行说明。不要只写在表格后面。

### Accessibility

能从模板、props 或所依赖的 Reka 原语核对到 `role`、`aria-*`，或明确的键盘行为时才写。

- 总述一两句，点明元素、原语和关键 `aria-*`。
- 键盘表仅在行为可核实时出现，列名固定 `Key` / `Description`。`Key` 用代码格式。同一行为的多个键可以写成 `` `ArrowUp` / `ArrowDown` ``，或各写一行。
- 没有总述也没有键盘表 → 整章不写。不要只留一个 `### Keyboard Interactions`。

### CSS Variables

唯一来源是 registry item 的 `cssVars`：`{ "<theme>": { "<name>": "<value>" } }`，页面变量名为 `--<theme>-<name>`。不要把 `*.style.ts` 里的 class 编造成 `cssVars`，也不要在 README 复述这一章。

## 外部依赖

item.`dependencies` 是该组件独有的外部 npm 包。维护 `registry.json` 时，把同一列表写进 README 的 YAML frontmatter，字段名 `dependencies`。它必须是文件的第一段，格式遵循 [VitePress frontmatter](https://vitepress.dev/guide/frontmatter)：

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
- 顶层已有的包不要再写入 item.`dependencies`。只有该组件独有的包才两边一起加，例如 Icon 的 `@iconify/vue`。不要新增 `when: "on-init"`。

范本：`src/components/icon/README.md`。Button 没有外部依赖，README 不以 frontmatter 开头。

## Examples

`usage.vue` 挂在 Usage 下，不进入 Examples。其余文件每个一块 `###`，标题由文件名生成：`with-icon` → `With Icon`。若文件名以 `<itemName>-` 开头，该前缀会被去掉。

```text
examples/
  usage.vue
  variants.vue
  sizes.vue
  radius.vue
  with-icon.vue
  loading.vue
  disabled.vue
```

| 源码里可演示的轴     | 文件            |
| -------------------- | --------------- |
| 最小默认用法         | `usage.vue`     |
| `variant` 等外观枚举 | `variants.vue`  |
| `size`               | `sizes.vue`     |
| `radius`             | `radius.vue`    |
| 前置图标 / 仅图标    | `with-icon.vue` |
| `loading`            | `loading.vue`   |
| `disabled`           | `disabled.vue`  |
| `color`              | `color.vue`     |

一个文件只演示一个属性，或一组同时出现才有意义的状态。用 kebab-case，不要用 `<name>-1.vue`。

```vue
<script lang="ts" setup>
import Button from '../button.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <Button label="Primary" variant="primary" />
    <Button label="Danger" variant="danger" />
  </div>
</template>
```

- `<script lang="ts" setup>`，从 `../<file>.vue` 相对导入。模板里的组件名用 PascalCase。
- 外层用 UnoCSS：`flex`、`items-center`、`gap-3`；项多时加 `flex-wrap`。不要在示例里写标题或说明。
- 只设该示例要展示的 props，其余用默认值。仅图标、没有可见文案时加 `aria-label`。
- 重复数据可以放在 `script setup` 里，再用 `v-for`（见 `icon/examples/usage.vue`）。

## registry.json

registry.json 也是文档的重要组成部分，属于第一公民，所有变化都必须与 registry.json 同步。

registry.json 维护时，不要以字母排序，使用自然排序，相近功能排在一起。

`items` 顺序即同一 `docs.category` 内的侧栏顺序。新增 item 插到功能相近的已有 item 旁边（`button` / `button-group`，`icon` / `icon-stack` / `icon-tile` / `animated-toggle-icon`，`link` / `link-overlay`）。`utils` 保持最前。不要按 `name` 字母序插入或重排整个数组。

磁盘上的 `README.md`、`examples/*.vue` 与 item.`files` 里的 `kind: "doc"`、`kind: "example"` 一一对应。新增、删除、改名、调整展示顺序时，同时改文件和 `registry.json`。只改一边视为未完成。

`files` 顺序：实现文件（`.vue`、`.props.ts`、`.style.ts`）→ `kind: "doc"` → `kind: "example"` → `kind: "test"`。已有实现文件和 test 条目保持不动。`usage.vue` 是第一条 example。

```json
{
  "type": "component",
  "kind": "doc",
  "path": "src/components/button/README.md"
}
```

```json
{
  "type": "component",
  "kind": "example",
  "path": "src/components/button/examples/usage.vue"
}
```

其它 registry item 用 `registryDependencies`。外部 npm 包的登记方式见「外部依赖」。

## 验证

验证时，通过工具来读取生成的文档，不要跑 dev server。

读 `src/components/<name>/README.md`、`src/components/<name>/examples/*.vue` 和 `registry.json` 里对应 item，核对：

- README 的 H2 都能被页面消费；没有空的 Events / Slots / Accessibility
- 每个 `examples/*.vue` 都有 `kind: "example"`，`README.md` 有 `kind: "doc"`，没有指向已删除文件的条目
- README frontmatter 的 `dependencies` 与 item.`dependencies` 一致；没有外部依赖时没有这段 frontmatter
- example 在 `files` 中的顺序就是页面顺序，且每个示例都能从 `../<name>.vue` 导入
- `registry.json` 仍是合法 JSON
