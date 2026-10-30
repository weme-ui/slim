# Component

判定为组件后再读。结构跟 `src/components/button/README.md` 和 `src/components/button/examples/`，只学结构，API 以本 item 源码为准。

路径：`README.md`、`examples/*.vue`、`<name>.test.ts`。没有 `meta.docs.category` 时补 `general` / `General`，除非用户指定或已有同组。

## H2

`Installation`、`Usage`、`Props`、`Events`、`Slots`、`Accessibility`。键盘小节标题必须是 `Keyboard Interactions`。

- `Props` 必有。默认值同时对照本组件 `withDefaults`、`*.style.ts` 的 `defaultVariants`，以及上游透传 props 的运行时默认值。公开 props 来自 `*.props.ts`；继承的 Reka `PrimitiveProps`（`as`、`asChild`）若确实透传，也列入表。
- 源码有 `defineEmits` / `emit()` → `Events`；回调 prop（如 `onClick`）留在 Props。
- 模板有具名或默认 slot → `Slots`；说明写清作用域参数，与模板 `v-bind` / slot props 一致。
- 能从模板、props、所依赖的 Reka 原语，或 Reka 单页的 Accessibility / Keyboard Interactions 核对到 `role`、`aria-*` 或明确键盘行为 → `Accessibility`：总述一两句，点明元素、原语和关键 `aria-*`。键盘表列名固定 `Key` / `Description`。同一行为的多个键写成 `` `ArrowUp` / `ArrowDown` `` 或各写一行。没有总述也没有键盘表 → 整章不写。
- 空章删除。`cssVars` 只存在 registry item 里，README 不复述；不要把 `*.style.ts` 的 class 编造成 `cssVars`。

`## Usage` 正文留空。预览来自 `examples/usage.vue`。API 表只消费第一张表。

## Examples

`usage.vue` 必有，挂在 Usage 下。其余每个文件一块 Examples，标题由文件名生成：`with-icon` → `With Icon`；以 `<itemName>-` 开头的前缀会去掉。`files` 里 example 顺序即页面顺序，`usage.vue` 第一条。

一个文件只演示一个属性，或一组同时出现才有意义的状态。kebab-case。常见轴：`usage`、`variants`、`sizes`、`radius`、`with-icon`、`loading`、`disabled`、`color`。

- `<script lang="ts" setup>`，从 `../<file>.vue` 相对导入，模板里 PascalCase。
- 外层 UnoCSS：`flex`、`items-center`、`gap-3`；项多时 `flex-wrap`。示例里不写标题或说明。
- 只设该示例要展示的 props。仅图标、没有可见文案时加 `aria-label`。重复数据放 `script setup` 再用 `v-for`（见 `icon/examples/usage.vue`）。

## 测试

范本 `src/components/empty/empty.test.ts`。style 轴多时看 `button.test.ts`。无 `*.style.ts` 时只测挂载（`config-provider.test.ts`）。axe 若必须关规则，在断言旁用一行注释写明原因（`button-group.test.ts`）。

有 `*.style.ts` 时先测 `useXxxStyle`：

1. 默认变体（`{}`）
2. 各枚举轴（与 examples 对齐）
3. 关键状态（`disabled`、`loading`、`unstyled`）

再挂载：`data-slot`（若模板有）+ `axe`；以及文档里写过的独特行为。
