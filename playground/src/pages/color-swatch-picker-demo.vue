<script lang="ts" setup>
const { getThemeColors } = useTheme()

const colors = getThemeColors()
const color = ref('')

const neutralColors = getThemeColors('neutral')
const neutralColor = ref('')
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <ColorSwatchPicker v-model="color" :colors="colors" />
    <p>{{ color }}</p>

    <ColorSwatchPicker v-model="neutralColor" type="neutral" :colors="neutralColors" />
    <p>{{ neutralColor }}</p>
  </div>
</template>
