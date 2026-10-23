<script lang="ts" setup>
import type { TagGroupItem } from '../tag-group.props'
import { ref } from 'vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagGroup from '../tag-group.vue'

const defaultValues = {
  none: '',
  md: '',
  full: '',
}

function createItems(): TagGroupItem[] {
  return [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    { label: 'Three', value: 'three' },
  ]
}

const noneItems = ref(createItems())
const mdItems = ref(createItems())
const fullItems = ref(createItems())
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-4 max-w-sm w-full">
    <FormField name="none" label="None">
      <TagGroup radius="none" :items="noneItems" />
    </FormField>
    <FormField name="md" label="Medium">
      <TagGroup radius="md" :items="mdItems" />
    </FormField>
    <FormField name="full" label="Full">
      <TagGroup radius="full" :items="fullItems" />
    </FormField>
  </Form>
</template>
