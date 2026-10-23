<script lang="ts" setup>
import type { TagGroupItem } from '../tag-group.props'
import { ref } from 'vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagGroup from '../tag-group.vue'

const defaultValues = {
  tags: '',
}

const items = ref<TagGroupItem[]>([
  { label: 'Plain', value: 'plain' },
  { label: 'Custom', value: 'custom' },
  { label: 'Styles', value: 'styles' },
])
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField name="tags" label="Unstyled">
      <TagGroup unstyled :items="items" />
    </FormField>
  </Form>
</template>
