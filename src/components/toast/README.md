# Toast

短暂提示，会叠在一起。外层放 `ToastProvider`，用 Reka UI 的 `useToastManager()` 添加。`status` 会换上对应图标和配色。指针悬停或焦点在视口里时展开。`side` 决定位置和划走方向。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/toast
```

## Usage

## Props

| 属性             | 说明                                                                                                                                                                                                                                                  | 类型                                                                                             | 默认值             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------ |
| `side`           | `ToastProvider`。视口位置。上沿划走为 `up`，下沿为 `down`，左侧为 `left`，右侧为 `right`。类型上的 `swipeDirection` 不会转发                                                                                                                          | `'top-left' \| 'top' \| 'top-right' \| 'bottom-right' \| 'bottom' \| 'bottom-left'`              | `'bottom-right'`   |
| `gap`            | `ToastProvider`。两条之间的间距（像素），并写入视口 `--gap`                                                                                                                                                                                           | `number`                                                                                         | `16`               |
| `orientation`    | `ToastProvider` 传给 `Toaster` 里的 `Toast`；写在 `Toast` 上则管这一条。`vertical` 时操作区落到文案下面                                                                                                                                               | `'horizontal' \| 'vertical'`                                                                     | `'horizontal'`     |
| `closeIcon`      | 关闭图标（Iconify）。`ToastProvider` 未设时由 `Toast` 补默认值                                                                                                                                                                                        | `IconifyIconProps['icon']`                                                                       | `'ri:close-line'`  |
| `loadingIcon`    | `status` 为 `loading` 时的图标（Iconify），并带旋转                                                                                                                                                                                                   | `IconifyIconProps['icon']`                                                                       | `'ri:loader-line'` |
| `closable`       | 是否显示关闭按钮。`Toaster` 优先用 `data.closable`                                                                                                                                                                                                    | `boolean`                                                                                        | —                  |
| `label`          | `ToastProvider`。读屏用来称呼每条提示的文案（Reka UI）                                                                                                                                                                                                | `string`                                                                                         | `'Notification'`   |
| `duration`       | 自动关闭的毫秒数。`Toast` 上的值覆盖 `ToastProvider`。`0` 或 `Infinity` 不自动关；记录的 `status` 为 `loading` 时 Reka UI 也不自动关                                                                                                                  | `number`                                                                                         | `5000`             |
| `disableSwipe`   | `ToastProvider`。是否禁止划动关闭                                                                                                                                                                                                                     | `boolean`                                                                                        | `false`            |
| `swipeThreshold` | `ToastProvider`。划动超过多少像素才关闭                                                                                                                                                                                                               | `number`                                                                                         | `50`               |
| `limit`          | `ToastProvider`。同时可见的条数。超出的旧条目带 `data-limited` 和 `inert`，不会被删掉。未设则不限制                                                                                                                                                   | `number`                                                                                         | —                  |
| `toastManager`   | `ToastProvider`。`createToastManager()` 的实例，方便在组件外添加                                                                                                                                                                                      | `GlobalToastManager`                                                                             | —                  |
| `as`             | `Toast` 根节点渲染为的元素或组件（Reka UI `Primitive`）                                                                                                                                                                                               | `AsTag \| Component`                                                                             | `'li'`             |
| `asChild`        | `Toast`。合并到子元素上渲染（Reka UI composition）                                                                                                                                                                                                    | `boolean`                                                                                        | —                  |
| `open`           | `Toast` 受控开关；可用 `v-model:open`。传入 `toast` 时以记录的 `open` 为准                                                                                                                                                                            | `boolean`                                                                                        | —                  |
| `defaultOpen`    | `Toast` 非受控时的初始开关                                                                                                                                                                                                                            | `boolean`                                                                                        | `true`             |
| `forceMount`     | `Toast`。强制挂载，便于自己做动画                                                                                                                                                                                                                     | `boolean`                                                                                        | —                  |
| `type`           | `Toast` 的读屏敏感度。`foreground` 立刻播报，`background` 礼貌播报。传入 `toast` 时以记录为准                                                                                                                                                         | `'foreground' \| 'background'`                                                                   | `'foreground'`     |
| `toast`          | `useToastManager()` 的一条记录。`Toaster` 会传入。`open`、`duration`、`type` 以这条记录为准                                                                                                                                                           | `ToastObject`                                                                                    | —                  |
| `icon`           | 图标（Iconify）。图标区域只在 `loading` 或有状态图标时渲染，这条属性目前到不了界面                                                                                                                                                                    | `IconifyIconProps['icon']`                                                                       | —                  |
| `title`          | 标题。无 `title` 插槽时作为内容；没有它时标题不渲染                                                                                                                                                                                                   | `string`                                                                                         | —                  |
| `description`    | 描述。无 `description` 插槽时作为内容；没有它时描述不渲染                                                                                                                                                                                             | `string`                                                                                         | —                  |
| `status`         | 语义状态，覆盖 `variant` 并决定图标。`info` 为 `ri:information-fill`，`success` 为 `ri:checkbox-circle-fill`，`warning` 为 `ri:alert-fill`，`error` 为 `ri:indeterminate-circle-fill`。其它字符串不改配色                                             | `'loading' \| 'info' \| 'success' \| 'warning' \| 'error' \| (string & {})`                      | —                  |
| `variant`        | 外观配色。有 `status` 时被状态配色盖掉                                                                                                                                                                                                                | `'default' \| 'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'default'`        |
| `actions`        | 操作按钮。每项是去掉 `as`、`asChild`、`variant` 的 `ButtonProps`，另有 Reka `altText`、`closeOnClick`。渲染时固定 `variant="soft"`、`size="sm"`。`color` 未传时，`loading` 用 `'default'`，否则用当前配色。`alt-text` 用 `label`，没有则是 `'Action'` | `ToastActionProps[]`                                                                             | —                  |
| `expanded`       | `Toaster` 会传入视口是否展开。`Toast` 模板目前不读                                                                                                                                                                                                    | `boolean`                                                                                        | —                  |
| `class`          | `Toast` 根节点额外 class。`Toaster` 会合并自己的堆叠 class 和 `data.class`                                                                                                                                                                            | `any`                                                                                            | —                  |
| `ui`             | 覆盖 `Toast` slots 样式（`root` / `container` / `icon` / `wrapper` / `content` / `title` / `description` / `actions` / `action` / `close`）。`Toaster` 不传 `data.ui`                                                                                 | `Partial<ToastStyleSlots>`                                                                       | —                  |

## Events

| 事件            | 说明                                                                    | 参数                   |
| --------------- | ----------------------------------------------------------------------- | ---------------------- |
| `update:open`   | `Toast` 开关变化时触发（含 `v-model:open`）。`Toaster` 在关闭时收起该条 | `value: boolean`       |
| `escapeKeyDown` | 按下 `Escape` 时触发。`preventDefault` 可以取消关闭                     | `event: KeyboardEvent` |
| `pause`         | 自动关闭计时暂停（指针在视口上、视口聚焦或窗口失焦）                    | —                      |
| `resume`        | 自动关闭计时恢复                                                        | —                      |
| `swipeStart`    | 开始划动。`preventDefault` 可以取消这次手势                             | `event: SwipeEvent`    |
| `swipeMove`     | 划动中。`preventDefault` 可以取消                                       | `event: SwipeEvent`    |
| `swipeCancel`   | 划动取消。`preventDefault` 可以取消                                     | `event: SwipeEvent`    |
| `swipeEnd`      | 划动结束。未取消时会关闭                                                | `event: SwipeEvent`    |

## Slots

| 插槽          | 说明                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------- |
| `default`     | `ToastProvider` 的子树。`Toaster` 和视口由组件自己渲染                                   |
| `icon`        | `Toast` 图标。作用域参数 `{ status }`。仅 `loading` 或有状态图标时渲染；未传时用对应图标 |
| `title`       | 标题内容。仅 `title` 有值时渲染；未传时回退到 `title`                                    |
| `description` | 描述内容。仅 `description` 有值时渲染；未传时回退到 `description`                        |
| `close`       | 关闭按钮内容。仅 `closable` 时渲染；未传时为 `closeIcon`                                 |

## Accessibility

基于 Reka UI `ToastProvider`、`ToastViewport`、`ToastRoot`。视口是 `ol`，外包一层 `role="region"`，`aria-label` 默认是 `Notifications (F8)`。每条是 `li`，`tabindex="0"`，带 `data-state`、`data-swipe-direction`。传入的 `toast.status` 会写到 `data-status`（单独的 `status` prop 不写这个属性）。播报节点是 `role="alert"`：`type` 为 `foreground` 时 `aria-live="assertive"`，`background` 时为 `polite`。关闭按钮是 `type="button"`。操作按钮是 `ToastAction`（`asChild`）里的 `Button`。

### Keyboard Interactions

| Key                 | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `F8`                | 把焦点移到通知视口（Reka UI `ToastViewport` 默认热键）    |
| `Tab` / `Shift+Tab` | 在视口内按从新到旧的顺序移动焦点                          |
| `Escape`            | 关闭 toast；在 `escapeKeyDown` 里 `preventDefault` 可取消 |
