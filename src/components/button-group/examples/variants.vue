<script lang="ts" setup>
import Button from '../../button/button.vue'
import ButtonGroup from '../button-group.vue'
</script>

<template>
  <div class="flex flex-wrap gap-6 items-start">
    <ButtonGroup variant="solid">
      <Button label="Left" />
      <Button label="Center" />
      <Button label="Right" />
    </ButtonGroup>
    <ButtonGroup variant="soft">
      <Button label="Left" />
      <Button label="Center" />
      <Button label="Right" />
    </ButtonGroup>
    <ButtonGroup variant="outline">
      <Button label="Left" />
      <Button label="Center" />
      <Button label="Right" />
    </ButtonGroup>
    <ButtonGroup variant="ghost">
      <Button label="Left" />
      <Button label="Center" />
      <Button label="Right" />
    </ButtonGroup>
    <ButtonGroup variant="plain">
      <Button label="Left" />
      <Button label="Center" />
      <Button label="Right" />
    </ButtonGroup>
    <ButtonGroup variant="inverse">
      <Button label="Left" />
      <Button label="Center" />
      <Button label="Right" />
    </ButtonGroup>
  </div>
</template>
