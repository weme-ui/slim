<script lang="ts" setup>
import { TooltipProvider } from 'reka-ui'
import Button from '../../button/button.vue'
import Tooltip from '../tooltip.vue'
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <div class="flex items-center">
      <Tooltip
        content="Saving"
        loading
        as-child
      >
        <Button label="Save" />
      </Tooltip>
    </div>
  </TooltipProvider>
</template>
