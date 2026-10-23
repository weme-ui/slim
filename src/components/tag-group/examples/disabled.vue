<script lang="ts" setup>
import type { TagGroupItem } from '../tag-group.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagGroup from '../tag-group.vue'

const defaultValues = {
  tags: '',
}

const items: TagGroupItem[] = [
  { label: 'Locked', value: 'locked' },
  { label: 'Read only', value: 'readonly' },
  { label: 'Disabled', value: 'disabled' },
]
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField name="tags" label="Disabled">
      <TagGroup disabled :items="items" />
    </FormField>
  </Form>
</template>
