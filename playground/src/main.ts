import 'uno.css'
import { accentColors, neutralColors } from 'virtual:weme-ui-config'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import App from './App.vue'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0, behavior: 'smooth' }),
  routes,
})

console.log('Weme UI Config:', accentColors, neutralColors)

if (import.meta.hot) {
  handleHotUpdate(router)
}

app.use(router)
app.mount('#app')
