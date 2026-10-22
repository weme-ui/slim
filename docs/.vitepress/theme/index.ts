import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ApiTable from './components/ApiTable.vue'
import ComponentDoc from './components/ComponentDoc.vue'
import ExamplePreview from './components/ExamplePreview.vue'
import 'virtual:uno.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout),
  enhanceApp({ app }) {
    app.component('ApiTable', ApiTable)
    app.component('ComponentDoc', ComponentDoc)
    app.component('ExamplePreview', ExamplePreview)
  },
} satisfies Theme
