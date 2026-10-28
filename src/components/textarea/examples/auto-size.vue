<script lang="ts" setup>
import Textarea from '../textarea.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Textarea
      :auto-size="true"
      :rows="2"
      :max-rows="6"
      placeholder="Grows with content…"
    />

    <Textarea
      :auto-size="false"
      :rows="4"
      placeholder="Fixed height…"
    />
  </div>
</template>
