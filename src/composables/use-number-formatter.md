---
dependencies:
  - '@internationalized/number'
---

# useNumberFormatter

按当前 locale 格式化数字。locale 来自 Reka UI `useLocale`，选项交给 `@internationalized/number` 的 `NumberFormatter`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/use-number-formatter
```

## Usage

```ts
import { useNumberFormatter } from '~/composables/use-number-formatter'

const formatter = useNumberFormatter({ style: 'percent' })
formatter.value.format(0.64)
```

## Parameters

| 参数      | 说明                                                                                      | 类型                  | 默认值 |
| --------- | ----------------------------------------------------------------------------------------- | --------------------- | ------ |
| `options` | 传给 `NumberFormatter` 的格式选项。普通对象按调用时的值固定，之后改字段不会重建 formatter | `NumberFormatOptions` | —      |

没有 `ConfigProvider` 时 locale 是 `'en'`。有的话用它的 `locale`。

## Returns

VueUse 的 `ComputedRefWithControl<NumberFormatter>`。`.value` 是 `NumberFormatter`。`locale` 变化时重建。可以调用 `trigger()` 强制重建。
