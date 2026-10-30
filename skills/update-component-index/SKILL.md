---
name: update-component-index
description: >-
  Updates Slim docs component-index CSS sketches (glyphs) to match the
  coss.com/ui miniature UI language. Use when adding a component glyph, or
  when the user mentions sketch, glyph, or 组件索引.
---

# Update Component Index

索引页每个组件是 CSS 微型 UI，对齐 [coss.com/ui](https://coss.com/ui) 的 sketch：像控件。索引列表由 registry 里 `type: "component"` 驱动。本 skill 只维护 sketch；README / examples 归 `create-docs`。不改 registry 排序、不改组件实现。

几乎总是改 `docs/.vitepress/theme/components/ComponentGlyph.vue`。卡片外壳 `ComponentIndex.vue` 只在三层结构和 Preview 对不齐时才动。不为 glyph 新增 `style.css` token。

## 查阅

1. `bun skills/update-component-index/scripts/glyphs.ts <name>`：是否已有 item / glyph、`missing`、`analogs`、`neighbors`。没有 item 则索引不会出现。
2. 有 analog 时 Grep 该 `name ===` 的 `v-if` 分支（加上下文），复制再改识别特征。Grep `.g-bar` / `.g-mini` / `.g-pill` / `.g-group` / `.g-row` 看已有原子。不要 Read `ComponentGlyph.vue` 全文。
3. 读 `src/components/<name>/` 与 `examples/usage.vue`，确认默认可识别剪影。
4. 脚本没有 analog 时才读 [reference.md](reference.md)。coss 有同名卡时先复刻结构再映射 token。

## 三色

容器 = 索引卡中层 `--docs-card`，不是内井 `--docs-well`。

1. 主体背景 = 容器：`--shell: var(--docs-card)`
2. 高亮 / 选中 = 标题色：`--fill: var(--vp-c-text-1)`
3. root 有 `1px solid var(--edge)`（`--docs-line`）。Empty 只把 `border-style` 改成 `dashed`

条带用 `--ink`（neutral-12 40%）和 `--ink-soft`（20%）。实心上的反色条用 `--docs-well`。嵌套卡同时满足 `--shell` 背景、`--edge` 边框、`--mini-radius`。控件用自己的表面画边框。

`.glyph` 根上的变量保持这些名字：`--ink`、`--ink-soft`、`--edge`、`--shell`、`--fill`、`--mini-radius`。单个 sketch 不覆盖成 accent。

## 半径

`.g-root` + `--mini-radius: 1rem` 只给 `.g-mini`（约 12.5rem 宽、高度够像卡片）。没有面板的剪影（Link、Icon、Toggle）直接画在 well 里。

| 形态             | 半径                    | 谁用                              |
| ---------------- | ----------------------- | --------------------------------- |
| 嵌套卡 `.g-mini` | `--mini-radius`（1rem） | Accordion / Card / Empty 这类面板 |
| 按钮 / group     | `0.45rem`               | `.g-pill`、`.g-group`             |
| tile             | `0.7rem`                | `icon-tile`                       |
| 胶囊 `999px`     | 组件本身就是胶囊        | Badge；条可以 `999px`，外壳不行   |

## 硬规则

1. 纯 CSS。装饰形用 `clip-path` / 边框三角。
2. sketch 主体 `--shell`，高亮 `--fill`，条带 `--ink` / `--ink-soft`。hero 可以用 `--accent-*`。
3. 剪影能一眼认出该组件。新 glyph 优先用已有 `.g-*`；现有 class 表达不了才加 CSS，尺度保持 `h-1.5`、`gap-2`、`p-3`。
4. 每个已发布的 `type: "component"` 必须有具名 `v-if`。`.g-fallback` 只给尚未画完的草稿。`v-if` 顺序与 registry 自然分组一致。
5. 卡片三层（外环 / 中层 / 内井）已对齐 Preview。hover：glyph `translateY(-3px)`。

## 新增 glyph

```text
Task Progress:
- [ ] 读 usage 剪影
- [ ] bun skills/update-component-index/scripts/glyphs.ts <name>；有 analog 则 Grep 该分支，否则读 reference.md，并打开 https://coss.com/ui 看近义卡
- [ ] 在 ComponentGlyph.vue 于 fallback 之前加 v-if="name === '<name>'"
- [ ] 嵌套卡才用 .g-mini / .g-root；控件用自己的半径；高亮走 --fill
- [ ] 浏览器浅色 + 深色对照：本卡、文档 Preview、coss 原卡
- [ ] bun lint && bun lint:fix && bun typecheck
```

## 验证

`bun skills/update-component-index/scripts/glyphs.ts <name>` 退出码 0。打开 `/components/`。浅色 / 深色各看一次：嵌套卡主体与标题栏同色，高亮与标题同色，剪影不被圆角吃成胶囊。点进文档对照 Usage Preview 的三层边框。有 coss 同名卡时并排看：条高 6px、圆头、嵌套 `rounded-2xl`、行 `p-3` + `gap-2`、主条 40% / 辅条 20%。单张截图不够。
