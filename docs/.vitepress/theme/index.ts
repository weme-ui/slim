import type { Theme } from 'vitepress'
import CopyOrDownloadAsMarkdownButtons from 'vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ApiTable from './components/ApiTable.vue'
import ComponentDoc from './components/ComponentDoc.vue'
import ComponentIndex from './components/ComponentIndex.vue'
import ExamplePreview from './components/ExamplePreview.vue'
import HomePage from './components/HomePage.vue'
import 'uno.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout),
  enhanceApp({ app }) {
    app.component('ApiTable', ApiTable)
    app.component('ComponentDoc', ComponentDoc)
    app.component('ComponentIndex', ComponentIndex)
    app.component('ExamplePreview', ExamplePreview)
    app.component('HomePage', HomePage)
    app.component('CopyOrDownloadAsMarkdownButtons', CopyOrDownloadAsMarkdownButtons)
  },
} satisfies Theme
