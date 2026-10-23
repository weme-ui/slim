<script lang="ts" setup>
import type { TagGroupItem, TagGroupItemValue } from '../tag-group.props'
import { ref } from 'vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagGroup from '../tag-group.vue'

const defaultValues = {
  single: '',
  multiple: '',
}

const singleItems = ref<TagGroupItem[]>([
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
])

const multipleItems = ref<TagGroupItem[]>([
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
])

const singleValue = ref<TagGroupItemValue>()
const multipleValue = ref<TagGroupItemValue[]>([])

function onRemoveSingle(values: TagGroupItemValue[]) {
  singleItems.value = singleItems.value.filter(item => !values.includes(item.value))
}

function onRemoveMultiple(values: TagGroupItemValue[]) {
  multipleItems.value = multipleItems.value.filter(item => !values.includes(item.value))
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-4 max-w-sm w-full">
    <FormField name="single" label="Single">
      <TagGroup
        v-model="singleValue"
        selection-mode="single"
        :items="singleItems"
        @remove="onRemoveSingle"
      />
    </FormField>
    <FormField name="multiple" label="Multiple">
      <TagGroup
        v-model="multipleValue"
        selection-mode="multiple"
        :items="multipleItems"
        @remove="onRemoveMultiple"
      />
    </FormField>
  </Form>
</template>
