<script lang="ts" setup>
import { TooltipProvider } from 'reka-ui'
import Button from '../../button/button.vue'
import Tooltip from '../tooltip.vue'

const sides = [
  'top',
  'top-right',
  'right',
  'bottom-right',
  'bottom',
  'bottom-left',
  'left',
  'top-left',
] as const
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <div class="flex flex-wrap gap-3 items-center justify-center">
      <Tooltip
        v-for="side in sides"
        :key="side"
        :content="side"
        :side="side"
        as-child
      >
        <Button :label="side" />
      </Tooltip>
    </div>
  </TooltipProvider>
</template>
