# coss.com/ui sketch 菜谱

`bun skills/update-component-index/scripts/glyphs.ts <name>` 没有 analog 时才读本文件。先选最近的菜谱，再按 `SKILL.md` 映射 token。

coss 卡片外壳是 `CardFrame` + `data-slot=card` 内井 + `data-slot=card-panel` 舞台。嵌套微型卡出现时是 `rounded-2xl border` 加轻微纵向渐变。Slim 用 `.g-mini`（12.5rem，含 `.g-root`）代替渐变。实测 Accordion 嵌套卡约 200×128。

---

## Accordion（嵌套卡 + divide-y 的基准）

```text
.g-mini.max-w-50
  divide-y
    row p-3:  chevron-down size-4  +  bar 40% w-[60%]
    row p-3:  chevron-down         +  stack(bar 40% w-[50%], bar 20% w-[90%])
    row p-3:  chevron-down         +  bar 40% w-[60%]
```

Chevron：lucide `size-4`。Slim 用 CSS 三角 / 折线，颜色 `--ink`。

Collapsible 同构，但展开行是 `px-4 py-3` 标题 + chevron，下一行 `p-4` 两根 20% 条（80% / 70%）。

## Alert / Toast

嵌套卡，单行 `p-3 flex items-center gap-2`：`size-4` 圆标 + 一根 20% 条 `w-[70%]`。

Toast 叠三张卡，最前一张带 icon + 主条 40% `w-[40%]` + 辅条 20% `w-[70%]`。Slim 画一张即可。

## Button

两个 pill 就是剪影，不外包 `.g-root`：

```text
flex gap
  pill.fill：--fill + 内条 --docs-well
  pill.ghost：--shell + 1px --edge，半径 0.45rem
```

## Button group / Group

```text
max-w-48  flex-row  divide-x  radius 14px  嵌套卡
两格，各 px-6 py-4 + 一根 40% 条
```

已有 `.g-group`（三格）。中间 `.is-on` 用 `--fill`，其上的条用 `--docs-well`。

## Badge

```text
max-w-24  radius 9999px  嵌套卡
px-2.5 py-2  flex gap-2
  size-2 rounded-full  88% ink
  bar 40% flex-1
```

## Avatar / Icon tile

```text
size-12  radius 9999px  嵌套卡
居中 lucide user → Slim：圆 + 内部 spark / 剪影
```

Icon-tile 已有：方壳 `2.85rem`，`.g-root`，内 spark。

## Empty

```text
.g-root  dashed  --shell
flex-col items-center gap-2  p-6
  size-8 rounded-full  20% ink
  bar 40% w-[60%]
  bar 20% w-[80%]
```

coss 用 `bg-none`；Slim 主体仍走 `--shell`。虚线只改 `border-style`。圆对应 `IconTile`，两根条对应 title / description。

## Separator

coss 首页是裸舞台。Slim 仍包 `.g-root` / `.g-mini`：

```text
.g-mini
  块 py-3 stack：bar 40% w-[60%] + bar 20%
  块 py-3  flex divide-x：四根 20% 条
```

有 `label` 的 Separator 可在中间加一根短 40% 条，两侧 `--edge` 线。

## Frame / Config-provider

```text
外：radius calc(2xl + 2px)  bg-muted/72  p-1   → Slim --docs-well 垫 0.25rem
内：完整嵌套卡  p-5
      bar 40% w-[70%]
      bar 20% w-[90%]
```

已有 `config-provider`：`.g-mini` + 顶栏条 + 三个 `.g-cells`。

## Card / Dialog / Link-overlay

嵌套卡 `max-w-36`，`p-4 flex-col gap-4`：

```text
stack：bar 40% w-[60%] + bar 20% w-[90%]
stack：h-4 rounded-sm  8% ink ×2
      h-4 rounded-sm  实心填充（`--fill`）
```

Dialog 底部改为 `justify-end gap-2`：一根浅描边钮 + 一根实心钮。

Link-overlay 已有：`.g-mini.g-overlay` + 顶栏 + 两根条 + 内缩 1px overlay。

## Input

嵌套卡 `max-w-72`，`bg-card/99`，radius 14px，`px-6 py-4`，一根 40% 条 `w-[60%]`。

## Checkbox

```text
max-w-28  flex-col gap-3
  row：size-4 rounded  20% ink  + bar 20% full
  row：size-4 rounded  `--fill` + bar 20% full
```

## Switch

```text
h-6 w-10 rounded-full  20% ink  p-0.5
  knob size-5 rounded-full  --shell + --docs-ring
```

## Tabs / Segmented

```text
flex-col gap-4  max-w-50
  轨道：rounded-lg  12% ink  p-0.5  flex
    选中段：card 面 + 一根 w-6 `--fill` 条
    两段未选：p-3 + 一根 w-6 20% 条
  内容：bar 40% w-[70%] + bar 20%
```

## Progress / Slider

Progress：`h-2` 轨道 20% ink，内 `w-[45%] rounded-s-full` `--fill`。

Slider：`max-w-50`，已走 35% 实心条 + `size-4` 圆钮 + 剩余 20% 轨道。钮和已走段都用 `--fill`。

## Skeleton

```text
max-w-50  flex gap-3
  size-8 rounded-full  20%
  stack 两根 20% full
```

coss 另加 shimmer mask。Slim 可省略动画。

## Spinner

```text
size-8  rounded-full  border-3
border 20% ink  +  border-top `--fill`
```

## Breadcrumb / Link

```text
嵌套卡  p-3  flex items-center gap-1
  bar 40% flex-1
  chevron-right size-4  88% ink
  bar 20% flex-1
  chevron
  bar 20% flex-1
```

Link 已有：well 里一根圆头条 + 45° 小箭头。Grep `.g-link-text` 看条怎么画。

## Kbd

两个 `size-10` 嵌套卡，radius 10px，居中短条或 CSS 字母形。Slim 用条保持零文字。
