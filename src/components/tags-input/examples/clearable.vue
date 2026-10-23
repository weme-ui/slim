<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { ref } from 'vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagsInput from '../tags-input.vue'

const defaultValues = {
  tags: '',
}

const tags = ref<TagsInputValue[]>(['alpha', 'beta', 'gamma'])
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField name="tags" label="Clearable">
      <TagsInput
        v-model="tags"
        clearable
        placeholder="Add a tag…"
      />
    </FormField>
  </Form>
</template>
