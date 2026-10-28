<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import * as v from 'valibot'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagsInput from '../tags-input.vue'

const schema = v.object({
  tags: v.pipe(
    v.array(v.string()),
    v.minLength(1, '至少加一个标签'),
  ),
})

const defaultValues = {
  tags: [] as TagsInputValue[],
}

function onFormSubmit(values: { tags: TagsInputValue[] }) {
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
      <TagsInput
        :model-value="field.state.value"
        placeholder="Add a tag…"
        prefix-icon="ri:search-line"
        clearable
        @blur="field.api.handleBlur"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
