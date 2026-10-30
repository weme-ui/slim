<script lang="ts" setup>
import { TooltipProvider } from 'reka-ui'
import Button from '../../button/button.vue'
import Tooltip from '../tooltip.vue'
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <div class="flex items-center">
      <Tooltip
        content="Favorite"
        icon="ri:heart-line"
        :trigger-props="{ asChild: true }"
      >
        <Button
          icon="ri:heart-line"
          aria-label="Favorite"
        />
      </Tooltip>
    </div>
  </TooltipProvider>
</template>
