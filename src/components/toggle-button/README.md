# Toggle Button

开关按钮。按一下在开和关之间切。基于 Reka UI `Toggle`。有 `icon` 时用 `AnimatedToggleIcon` 做进出场。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/toggle-button
```

## Usage

## Props

| 属性           | 说明                                                   | 类型                                                       | 默认值     |
| -------------- | ------------------------------------------------------ | ---------------------------------------------------------- | ---------- |
| `as`           | 根节点渲染为的元素或组件（Reka UI `Primitive`）        | `AsTag \| Component`                                       | `'button'` |
| `asChild`      | 合并到子元素上渲染（Reka UI composition）              | `boolean`                                                  | —          |
| `modelValue`   | 受控开关状态；可用 `v-model`                           | `boolean \| null`                                          | —          |
| `defaultValue` | 非受控初始开关状态                                     | `boolean`                                                  | —          |
| `variant`      | 外观变体                                               | `'soft' \| 'outline' \| 'ghost'`                           | `'soft'`   |
| `size`         | 尺寸；无 `label` 时为正方形                            | `'sm' \| 'md' \| 'lg'`                                     | `'md'`     |
| `radius`       | 圆角                                                   | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`     |
| `label`        | 按钮文案；未传且无默认插槽时不渲染标签                 | `string`                                                   | —          |
| `icon`         | 未按下态图标（Iconify）；有值时用 `AnimatedToggleIcon` | `IconifyIconProps['icon']`                                 | —          |
| `activeIcon`   | 按下态图标（Iconify）；未传时按下态回退到 `icon`       | `IconifyIconProps['icon']`                                 | —          |
| `scalable`     | 指针按下时是否缩放（禁用时不生效）                     | `boolean`                                                  | `true`     |
| `unstyled`     | 移除样式变体类，仅保留结构                             | `boolean`                                                  | —          |
| `disabled`     | 是否禁用                                               | `boolean`                                                  | `false`    |
| `name`         | 随表单提交的字段名                                     | `string`                                                   | —          |
| `required`     | 是否必填                                               | `boolean`                                                  | —          |
| `class`        | 根节点额外 class                                       | `any`                                                      | —          |
| `ui`           | 覆盖 slots 样式（`root` / `icon` / `label`）           | `Partial<ToggleButtonStyleSlots>`                          | —          |

## Events

| 事件                | 说明                                                      | 参数             |
| ------------------- | --------------------------------------------------------- | ---------------- |
| `update:modelValue` | 开关状态变更时触发（含 `v-model`）；由 Reka `Toggle` 转发 | `value: boolean` |

## Slots

| 插槽      | 说明                                                                                                                        |
| --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `default` | 自定义内容；作用域参数 `{ state, pressed }`（`state` 为 `'on' \| 'off'`，`pressed` 为指针按下）；未传时回退到图标与 `label` |

## Accessibility

默认渲染为原生 `button`（Reka UI `Toggle` / `Primitive`）。开关状态走 `data-state`（`on` / `off`）。指针按下时 `aria-pressed`（给缩放动效用）。根节点设置 `data-slot="toggle-button"`。禁用时带 `disabled` 与 `data-disabled`。有 `name` 且在表单里时，Reka 会再画一个隐藏的 checkbox 用来提交。仅图标、没有可见文案时请加 `aria-label`。

### Keyboard Interactions

| Key     | Description                             |
| ------- | --------------------------------------- |
| `Enter` | 切换开关状态（`as` 为原生 `button` 时） |
| `Space` | 切换开关状态（`as` 为原生 `button` 时） |
