# Tests

从 `create-docs` 的 SKILL.md 进来后再读本文件。组件细节见 [component.md](component.md)，composable 细节见 [composable.md](composable.md)。

测试与文档、示例一起维护，并登记 `kind: "test"`。不要改 `vitest.config.ts` / `test/vitest.setup.ts`。不要跑 `bun test`，用 `bun run test`。

范本：

- 组件：`src/components/empty/empty.test.ts`、`src/components/button/button.test.ts`、`src/components/icon-tile/icon-tile.test.ts`
- composable：`src/composables/use-form-context.test.ts`

## 何时写

| 模式            | 测试                                                                              |
| --------------- | --------------------------------------------------------------------------------- |
| **A：首次生成** | 必写。没有 `.test.ts` 视为未完成                                                  |
| **B：API 同步** | 默认保留。断言因 API 变更失效，或文档新增了可核对的公开行为而测试缺失时，才改或补 |

只测源码里能核对的公开行为。不要测上游包内部实现，不要为了覆盖率堆断言。

## 文件

| 类型       | 路径                                   |
| ---------- | -------------------------------------- |
| 组件       | `src/components/<name>/<name>.test.ts` |
| composable | `src/composables/<name>.test.ts`       |

`registry.json` 里必须有对应 `kind: "test"`，且为该 item `files` 的最后一组。新建或改名时同步 path；实现文件 path 保持不动。

```json
{
  "type": "component",
  "kind": "test",
  "path": "src/components/empty/empty.test.ts"
}
```

```json
{
  "type": "composable",
  "kind": "test",
  "path": "src/composables/use-form-context.test.ts"
}
```

## 共用约定

- Vitest + `@vue/test-utils`。DOM 无障碍用 `vitest-axe` 的 `axe`。
- 顶层 `describe`：组件用 item `name`（`'empty'`、`'icon-tile'`）；composable 用主函数标识符（`'useFormContext'`）。
- 先写不依赖 DOM 的断言，再写 `describe('given a ...')` 的挂载场景。
- `mount` 做 axe 时加 `attachTo: document.body`。每个挂载用例结束都 `wrapper.unmount()`。
- 断言 class 时对照 `*.style.ts` 的真实 class，用 `toContain` / `not.toContain`。不要编造 token。
- 需要完整巨型类型（如 TanStack `FormApi`）时允许 `as any` 桩对象，不要为此补全上游类型。
- 第三方再导出只测 `typeof fn === 'function'`，不要展开上游 API。

## 组件

有 `*.style.ts` 时，先测 `useXxxStyle`：

1. 默认变体（空对象 `{}`）
2. 各枚举轴（`size` / `variant` / `radius` / `color` / `unstyled` 等，与 examples 对齐）
3. 关键状态（`disabled`、`loading`、`unstyled`）

再挂载：

1. `given a ...`：`data-slot`（若模板有）+ `axe` 无违规
2. 文档里写过的独特行为（尺寸映射、禁用不触发 `onClick`、条件渲染子组件）

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { useEmptyStyle } from './empty.style'
import Empty from './empty.vue'

describe('empty', () => {
  it('applies default size and styled surface classes', () => {
    const ui = useEmptyStyle({})
    expect(ui.root()).toContain('text-sm')
    expect(ui.root()).toContain('b-transparent')
  })

  describe('given a default empty state', () => {
    it('sets data-slot and has no accessibility violations', async () => {
      const wrapper = mount(Empty, {
        attachTo: document.body,
        props: { icon: 'ri:inbox-line' },
        slots: {
          title: 'No results',
          description: 'Try adjusting your filters.',
        },
      })
      expect(wrapper.attributes('data-slot')).toBe('empty')
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
```

无 `*.style.ts` 的组件跳过 style 段，只测挂载行为（见 `config-provider.test.ts`）。axe 若必须关规则，在断言旁用一行注释写明原因（见 `button-group.test.ts`）。

## Composable

无 class 可测。覆盖：

1. 再导出（若有）是函数
2. `given a ...`：用 `defineComponent` + `h` 搭 Provider / Consumer，`mount` 后从 DOM 读注入结果

`createContext` 成对导出时，必须测「provide 之后子孙能读到」。不要直接调用 `useFormContext()` 却不提供上下文来当主路径。

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { computed, defineComponent, h, ref } from 'vue'
import {
  provideFormContext,
  useForm,
  useFormContext,
  useFormField,
} from './use-form-context'

describe('useFormContext', () => {
  it('re-exports TanStack Vue Form helpers', () => {
    expect(typeof useForm).toBe('function')
    expect(typeof useFormField).toBe('function')
  })

  describe('given a provided form context', () => {
    it('returns the injected value from a descendant', () => {
      const Provider = defineComponent({
        setup(_, { slots }) {
          provideFormContext({ /* FormContextValue 桩 */ })
          return () => slots.default?.()
        },
      })
      const Consumer = defineComponent({
        setup() {
          const context = useFormContext()
          return () => h('div', {
            'data-loading': String(context.loading.value)
          })
        },
      })
      const wrapper = mount({
        setup() {
          return () => h(Provider, null, {
            default: () => h(Consumer)
          })
        },
      })
      expect(wrapper.get('[data-loading]').attributes('data-loading')).toBe('true')
      wrapper.unmount()
    })
  })
})
```

Consumer 用 render 函数把值写到 DOM（`data-*`），不要指望 `wrapper.vm` 暴露 setup 返回值。

## 验证

```bash
bun run test src/components/<name>/<name>.test.ts
bun run test src/composables/<name>.test.ts
```

只跑当前 item 的测试文件。通过后再结束。`kind: "test"` 必须指向磁盘上真实存在的文件。
