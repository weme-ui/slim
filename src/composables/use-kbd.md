# useKbd

把键名换成键帽上的符号。`meta`、`ctrl`、`alt` 会按当前系统换。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/use-kbd
```

## Usage

```ts
import { useKbd } from '~/composables/use-kbd'

const { getKbdKey } = useKbd()
getKbdKey('meta_k')
```

## Returns

| 字段        | 类型                                     | 说明                                                                |
| ----------- | ---------------------------------------- | ------------------------------------------------------------------- |
| `macOS`     | `ComputedRef<boolean>`                   | `userAgent` 里有 `Macintosh;`                                       |
| `getKbdKey` | `(value?: KbdKey \| string) => string[]` | 查 `kbdKeysMap`。含 `_` 时拆开再查。没有的键转成大写。空值返回 `[]` |

挂载前 `meta`、`ctrl`、`alt` 是一个空格。挂载后 macOS 为 `⌘`、`⌃`、`⌥`，其它系统为 `Ctrl`、`Ctrl`、`Alt`。

## kbdKeysMap

键名到符号。`meta`、`ctrl`、`alt` 在表里是空字符串，真正显示的符号见上面。

| 字段         | 说明 |
| ------------ | ---- |
| `meta`       | —    |
| `ctrl`       | —    |
| `alt`        | —    |
| `win`        | `⊞`  |
| `command`    | `⌘`  |
| `shift`      | `⇧`  |
| `control`    | `⌃`  |
| `option`     | `⌥`  |
| `enter`      | `↵`  |
| `delete`     | `⌦`  |
| `backspace`  | `⌫`  |
| `escape`     | `⎋`  |
| `tab`        | `⇥`  |
| `capsLock`   | `⇪`  |
| `arrowUp`    | `↑`  |
| `arrowRight` | `→`  |
| `arrowDown`  | `↓`  |
| `arrowLeft`  | `←`  |
| `pageup`     | `⇞`  |
| `pagedown`   | `⇟`  |
| `home`       | `↖`  |
| `end`        | `↘`  |

## Types

### `KbdKey`

`keyof typeof kbdKeysMap`

### `KbdKeySpecific`

`'meta' | 'alt' | 'ctrl'`
