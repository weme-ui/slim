<script lang="ts" setup>
import type { TagGroupItem, TagGroupItemValue } from '../tag-group.props'
import * as v from 'valibot'
import { ref } from 'vue'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagGroup from '../tag-group.vue'

const schema = v.object({
  tags: v.pipe(
    v.string('请选择一个标签'),
    v.minLength(1, '请选择一个标签'),
  ),
})

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

function onFormSubmit(values: { tags: string }) {
  // eslint-disable-next-line no-alert
  alert(JSON.stringify(values))
}
</script>

<template>
  <Form
    class="max-w-sm w-full"
    :default-values="defaultValues"
    :schema="schema"
    @form-submit="onFormSubmit"
  >
    <FormField
      v-slot="{ field }"
      name="tags"
      label="Tags"
      required
    >
      <TagGroup
        :model-value="field.state.value"
        :items="items"
        selection-mode="single"
        closeable
        @change="field.api.handleChange"
        @remove="onRemove"
      />
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
