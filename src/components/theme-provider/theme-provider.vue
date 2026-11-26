<script lang="ts" setup>
import type { ThemeProviderProps } from './theme-provider.props'
import { watch, watchEffect } from 'vue'
import { useTheme } from '~/composables/use-theme'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ThemeProviderProps>()
const { preferences } = useTheme()

watch(
  () => ({ ...props }),
  (updated, val) => {
    if (updated.name !== val?.name) {
      preferences.value.theme = updated.name ?? 'default'
    }
    if (updated.appearance !== val?.appearance) {
      preferences.value.appearance = updated.appearance ?? 'auto'
    }
    if (updated.radius !== val?.radius) {
      preferences.value.radius = updated.radius ?? 'default'
    }
    if (updated.scaling !== val?.scaling) {
      preferences.value.scaling = updated.scaling ?? 'default'
    }
    if (updated.accent !== val?.accent) {
      preferences.value.accent = updated.accent ?? 'default'
    }
    if (updated.neutral !== val?.neutral) {
      preferences.value.neutral = updated.neutral ?? 'default'
    }
  },
)

const html = document.documentElement

watchEffect(() => {
  if (preferences.value.appearance !== 'auto') {
    html.classList.toggle('dark', preferences.value.appearance === 'dark')
  }

  html.setAttribute('data-theme', preferences.value.theme)
  html.setAttribute('data-radius', preferences.value.radius)
  html.setAttribute('data-scaling', preferences.value.scaling)

  if (preferences.value.accent && preferences.value.accent !== 'default') {
    for (let i = 1; i <= 12; i++) {
      html.style.setProperty(`--custom-accent-${i}`, `var(--${preferences.value.accent}-${i})`)
    }
  }

  if (preferences.value.neutral && preferences.value.neutral !== 'default') {
    for (let i = 1; i <= 12; i++) {
      html.style.setProperty(`--custom-neutral-${i}`, `var(--${preferences.value.neutral}-${i})`)
    }
  }
})
</script>

<template>
  <slot />
</template>
