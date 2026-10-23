---
name: update-component-index
description: >-
  Updates Slim docs component-index CSS sketches (glyphs) to match the
  coss.com/ui homepage miniature UI language. Use when adding a registry
  type:component item, editing ComponentGlyph.vue or ComponentIndex.vue,
  working on the /components/ index, or when the user mentions sketch, glyph,
  组件索引, coss.com/ui, or CSS illustrations.
---

# Update Component Index

根据 [coss.com/ui](https://coss.com/ui) 的 sketch，索引页每个组件必须是 **CSS 微型 UI**，要完美对齐参考的实现细节。不是图标、不是插画、不是 accent 色块。

索引列表由 `registry.json` 的 `type: "component"` 驱动。本 skill 只维护 sketch 与卡片外壳，不写 README / examples（那是 `create-docs`）。

## 文件

| 职责              | 路径                                                  | 何时改                             |
| ----------------- | ----------------------------------------------------- | ---------------------------------- |
| glyph（几乎总是） | `docs/.vitepress/theme/components/ComponentGlyph.vue` | 新增或改某个组件的 sketch          |
| 卡片外壳          | `docs/.vitepress/theme/components/ComponentIndex.vue` | 三层结构坏了才动                   |
| 文档 token        | `docs/.vitepress/theme/style.css`                     | 不要为了 glyph 新增 token          |
| 数据源            | `registry.json`                                       | 不改顺序；自然排序归 `create-docs` |

`ComponentIndex.vue` 用 `getComponentItems()` 渲染网格。不要在索引里手写组件名列表。

## 卡片三层（已对齐 Preview）

与文档 `ExamplePreview` / `.vp-doc div[class*='language-']` 同一套 token。coss 的 `CardFrame` 也是「外环 + 中层 card + 内井」：

| 层   | Slim                                                                                                                     | coss 对应                                                                                                                                                                |
| ---- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 外环 | `.index-card::after`：`inset: -5px`，`border: 1px solid var(--docs-ring-line)`，半径 `calc(var(--docs-radius) + 5px)`    | `after:-inset-[5px] after:border-border/64 after:rounded-[calc(var(--radius-xl)+4px)]`                                                                                   |
| 中层 | `.index-card`：`border` + `--docs-card` + `--docs-ring` + `--docs-radius`（1rem）                                        | `rounded-2xl border bg-card shadow-xs/5`                                                                                                                                 |
| 内井 | `.index-card-well`：`--docs-well`，`margin: 0 -1px -1px`，`min-height: 12.75rem`，`padding: 2rem`，`place-items: center` | `data-slot=card`：`min-h-55`（实测约 220px），`bg-[color-mix(card,sidebar)]`，`*:data-[slot=card]:-m-px`；内层 `card-panel`：`flex items-center justify-center px-8 p-6` |

不要改这三层，除非它已经和 Preview 对不齐。hero kicker / CTA 可以用 `--accent-*`；**sketch 里禁止 accent**。

hover：glyph `translateY(-3px)`。对应 coss `in-[[data-slot=card-frame]:has(a:not(:hover))]:*:translate-y-0.5`（静止略沉、悬停抬起）。

## 三色契约（必须对齐）

对照 [coss.com/ui](https://coss.com/ui) 每张卡的 nested sketch。容器 = 索引卡中层（标题所在的 `--docs-card`），不是内井 `--docs-well`。

1. sketch 的主体背景色，与容器背景相同
2. 高亮与选中的状态，与容器标题色相同
3. sketch 的 root 是有边框的

| 角色                  | Slim token                                        | coss 实测（dark）                                                        |
| --------------------- | ------------------------------------------------- | ------------------------------------------------------------------------ |
| 容器 / sketch 主体    | `--shell: var(--docs-card)`                       | frame `bg-card`；nested 卡 `bg-linear-to-b` 混 `card`，观感同容器        |
| 内井（sketch 坐落处） | `--docs-well`                                     | well 更深一档；不要拿它当 sketch 主体                                    |
| 标题 / 高亮 / 选中    | `--fill: var(--vp-c-text-1)`（即 `--neutral-12`） | 标题 `lab(96.5)`；Button 与 Card CTA 的 `--btn-from/--btn-to` 就是这个色 |
| root 边框             | `1px solid var(--edge)`（`--docs-line`）          | nested 卡 `border` 1px；Empty 用 dashed，仍算有边框                      |
| 实心上的反色条        | `--docs-well`                                     | `bg-primary-foreground/40`                                               |

嵌套卡（`.g-mini`）才同时满足：`background: var(--shell)`、`border: 1px solid var(--edge)`、半径 `--mini-radius`。Empty 只把 `border-style` 改成 `dashed`。控件（按钮、tile、group）用**自己的**表面画边框，半径见下节。

禁止再用 `neutral-12 72%` 冒充高亮，禁止把 `--docs-well` / `--ink-soft` 当成嵌套卡主体。

## 禁止变形

`.g-root` + `--mini-radius: 1rem` **只给** `.g-mini`（约 12.5rem 宽、高度够像卡片）。不要拿它去包矮、窄的内容。

短边一旦接近 `2 × 半径`，圆角会把剪影吃成胶囊。Link 是下划线条 + 箭头，被 1rem 外壳一包就变成输入框/胶囊——这种变形禁止。

| 形态             | 半径                    | 谁能用                                           |
| ---------------- | ----------------------- | ------------------------------------------------ |
| 嵌套卡 `.g-mini` | `--mini-radius`（1rem） | 宽约 12.5rem、像 Accordion / Card / Empty 的面板 |
| 按钮 / group     | `0.45rem`               | `.g-pill`、`.g-group`                            |
| tile             | `0.7rem`                | `icon-tile`                                      |
| 胶囊 `999px`     | 仅组件本身就是胶囊      | Badge；**条**可以 `999px`，**外壳**不行          |

「root 有边框」指组件自己的表面，不是再套一层壳去凑边框。没有面板的剪影（Link、Icon、Toggle）直接画在 well 里，不要 `.g-root`。

Link 范本（条本身是圆头，不是包一层壳）：

```css
.g-link-text {
  width: 5.4rem;
  height: 0.54rem;
  border-bottom: 1px solid var(--ink);
  background: var(--ink);
  border-radius: 999px;
  box-shadow: 0 3px 0 -2px var(--ink-soft);
}
```

## Sketch 原子（必须对齐）

coss 首页每个 sketch 都是这些 class 的组合。Slim 用 CSS 变量复刻，不要发明第三套尺寸。

| coss class                                   | Slim                                                                                    |
| -------------------------------------------- | --------------------------------------------------------------------------------------- |
| `h-1.5 rounded-full bg-muted-foreground/40`  | `.g-bar` + `--ink`（`neutral-12` 40%）                                                  |
| `h-1.5 rounded-full bg-muted-foreground/20`  | `.g-bar` + `--ink-soft`（20%）                                                          |
| `w-[50%]` / `60%` / `70%` / `80%` / `90%`    | `.is-md` 42% / `.is-lg` 64% / `.is-full` 92%，或与 coss 相同的百分比                    |
| `rounded-2xl border shadow-md/5` 嵌套卡      | `.g-mini`（含 `.g-root`）：`width: 12.5rem`、`--mini-radius: 1rem`、`--edge`、`--shell` |
| `divide-y divide-border` + 行 `p-3`          | `.g-row`：`padding: 0.75rem`，`gap: 0.5rem`；相邻行 `border-top: 1px solid var(--edge)` |
| `flex items-center gap-2`                    | `.g-row` / flex + `gap: 0.5rem`                                                         |
| `flex flex-col gap-2`                        | `.g-row.is-stack`                                                                       |
| `size-4 shrink-0 rounded`                    | 1rem 方块，背景 `--ink-soft`                                                            |
| `size-8 rounded-full bg-muted-foreground/20` | 2rem 圆，背景 `--ink-soft`                                                              |
| `size-2 rounded-full bg-muted-foreground/88` | 0.5rem 圆点，背景 `--ink`                                                               |
| lucide `size-4 text-muted-foreground/88`     | CSS 形（chevron / spark），颜色 `--ink`。不要引入 lucide / Iconify                      |
| `--btn-from` / `--btn-to` / `bg-primary`     | **禁止 accent**。实心 / 选中用 `--fill`（标题色）                                       |
| `bg-primary-foreground/40`（实心按钮上的条） | 条用 `--docs-well`                                                                      |
| `bg-muted/72` 外框垫                         | `--docs-well`                                                                           |
| `border-dashed border-input`                 | `.g-root` + `border-style: dashed`；背景仍是 `--shell`                                  |
| `divide-x` 分段                              | 子项 `border-left: 1px solid var(--edge)`                                               |
| `[--radius-2xl:14px]` 控件                   | `border-radius: 0.45rem`（已有 `.g-pill` / `.g-group`）                                 |
| `[--radius-2xl:9999px]` 胶囊                 | `border-radius: 999px`                                                                  |
| well 内水平居中                              | `.glyph` 已 `place-items: center`                                                       |

`.glyph` 根上的变量（不要改名、不要在单个 sketch 里覆盖成 accent）：

```css
--ink: color-mix(in oklch, var(--neutral-12) 40%, transparent);
--ink-soft: color-mix(in oklch, var(--neutral-12) 20%, transparent);
--edge: var(--docs-line);
--shell: var(--docs-card);
--fill: var(--vp-c-text-1);
--mini-radius: 1rem;
```

已有 `.g-root`、`.g-mini`、`.g-bar-on`、`.g-pill.is-fill`。`.g-bar-on` 与 `.is-fill` / `.is-on` 都走 `--fill`。

## 硬规则

1. **纯 CSS。** 无 `<img>`、无真实文字、无 Iconify。装饰形用 `clip-path` / 边框三角，不要为了 glyph 加依赖。
2. **sketch 零 `--accent-*`、零 `primary`、零 72% 灰。** 主体 `--shell`，高亮 `--fill`，条带 `--ink` / `--ink-soft`。hero 不受这条约束。
3. **像控件，不像 logo，更不像被压扁的胶囊。** 剪影必须能一眼认出该组件。禁止用统一圆角外壳改变长宽比或半径。coss 有同名卡片时，先复刻它的结构再映射 token。
4. **复用原子。** 新 glyph 优先用 `.g-root` / `.g-bar` / `.g-mini` / `.g-row` / `.g-pill` / `.g-group`。只有现有 class 表达不了才加 CSS，并保持 `h-1.5`、`gap-2`、`p-3` 这套尺度。
5. **每个已发布的 `type: "component"` 必须有具名 `v-if`。** `.g-fallback`（三根条）只给尚未画完的草稿。合并前换成专用分支。
6. **不要改卡片三层、不要改 registry 排序、不要改组件实现。**

## 新增 glyph

```text
Task Progress:
- [ ] 读 src/components/<name>/ 与 examples/usage.vue，确认默认可识别剪影
- [ ] 打开 https://coss.com/ui ，找同名或近义卡片，记下 card-panel 第一个子节点的结构
- [ ] 在 ComponentGlyph.vue 于 fallback 之前加 v-if="name === '<name>'"
- [ ] 嵌套卡才用 `.g-mini` / `.g-root`；控件用自己的半径；禁止矮盒子 + 1rem 圆角；高亮走 `--fill`；禁止 accent / primary / 72% 灰 / 真实文字
- [ ] 浏览器浅色 + 深色对照：本卡、文档 Preview block、coss 原卡
- [ ] bun lint && bun lint:fix && bun typecheck
```

`v-if` 分支顺序与 registry 自然分组一致（`button` 旁 `button-group`，`icon*` 一组，`link*` 一组），不要按字母重排整个 template。

coss 没有同名时：仍用同一套条、嵌套卡、`divide-y`，从 usage 剪影出发。菜谱见 [reference.md](reference.md)。

## 验证

1. 打开 `/components/`。每个 `type: "component"` 都有专用 glyph，没有 fallback。
2. 浅色 / 深色各看一次：嵌套卡主体与标题栏同色，高亮与标题同色。剪影不能被圆角吃成胶囊。不能漂成品牌色，也不能是 72% 灰。
3. 点进该组件文档，对照 Usage Preview 的三层边框：索引卡外环、中层、内井必须是同一套 `--docs-*`。
4. 有 coss 同名卡时，并排看：条高 6px、圆头、嵌套 `rounded-2xl`、行 `p-3` + `gap-2`、主条 40% / 辅条 20%。

不要用单张截图代替上述对照。

## 反模式

- 用 `--accent-9` 或 `neutral-12 72%` 填按钮、进度条、选中态
- sketch 嵌套卡主体用 `--docs-well` / `--ink-soft`
- 给 Link / Icon / Toggle 套 `.g-root`，或任何矮盒子用 `--mini-radius` 变成胶囊
- 在 glyph 里写组件名或 "Aa"
- 为每个组件复制一套全新 CSS，而不复用 `.g-bar` / `.g-mini`
- 改 `.index-card` 去「更像 coss」，把三层 Preview 契约改坏
- 只改 glyph 不核对 registry 是否已有该 `type: "component"`（没有 item 则索引不会出现）
- 按字母序插入 `v-if` 或重排 `registry.json`

## 相关

- 文档 / registry：`skills/create-docs`
- coss 结构菜谱：[reference.md](reference.md)
