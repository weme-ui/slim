/// <reference types="vitepress/client" />

declare module 'virtual:uno.css'

declare module 'virtual:docs-highlighted' {
  export const installationHtml: Record<string, string>
}

declare module '*?shiki&lang=vue' {
  const html: string
  export default html
}

declare module '*.md?raw' {
  const content: string
  export default content
}

declare module '*.vue?raw' {
  const content: string
  export default content
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}
