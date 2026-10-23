# Config Provider

应用级配置上下文。薄封装 Reka UI `ConfigProvider`，向子树注入阅读方向、locale、滚动锁定、Portal 目标与稳定 `useId` 等全局选项。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/config-provider
```

## Usage

## Props

| 属性         | 说明                                                                                                        | 类型                          | 默认值          |
| ------------ | ----------------------------------------------------------------------------------------------------------- | ----------------------------- | --------------- |
| `dir`        | 全局阅读方向，供子级原语继承                                                                                | `'ltr' \| 'rtl'`              | `'ltr'`         |
| `locale`     | 全局 locale，供子级原语继承                                                                                 | `string`                      | `'en'`          |
| `scrollBody` | 打开层时的 `body` 滚动锁定；`ScrollBodyOption` 含可选 `padding` / `margin`（`boolean \| number \| string`） | `boolean \| ScrollBodyOption` | `true`          |
| `nonce`      | 全局 `nonce`，供相关原语使用                                                                                | `string`                      | —               |
| `teleportTo` | 带 Portal 的原语（如 Dialog / Popover / Tooltip）默认挂载目标；单个 `*Portal` 仍可覆盖 `to`                 | `string \| HTMLElement`       | `'body'`        |
| `useId`      | 自定义 ID 生成函数，用于缓解 SSR / hydration 不一致；本封装默认使用 Vue 的 `useId()`                        | `() => string`                | `() => useId()` |

## Slots

| 插槽      | 说明                                       |
| --------- | ------------------------------------------ |
| `default` | 子树内容，通常为应用根或需要共享配置的区域 |

## Accessibility

基于 Reka UI `ConfigProvider`。通过 Context 向子树提供 `dir` 与 `locale`，供依赖阅读方向与本地化的原语继承；组件自身不渲染额外无障碍角色。
