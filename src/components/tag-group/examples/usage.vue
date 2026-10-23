<script lang="ts" setup>
import type { TagGroupItem, TagGroupItemValue } from '../tag-group.props'
import { ref } from 'vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagGroup from '../tag-group.vue'

const defaultValues = {
  tags: '',
}

const items = ref<TagGroupItem[]>([
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
])

function onRemove(values: TagGroupItemValue[]) {
  items.value = items.value.filter(item => !values.includes(item.value))
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="tags" label="Tags">
      <TagGroup
        :model-value="field.state.value"
        :items="items"
        variant="soft"
        selection-mode="single"
        closeable
        @change="field.api.handleChange"
        @remove="onRemove"
      />
      <p class="text-subtle">
        Selected: {{ field.state.value }}
      </p>
    </FormField>
  </Form>
</template>
