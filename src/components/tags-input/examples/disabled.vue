<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { ref } from 'vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagsInput from '../tags-input.vue'

const defaultValues = {
  tags: '',
}

const tags = ref<TagsInputValue[]>(['locked', 'readonly'])
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField name="tags" label="Disabled">
      <TagsInput
        v-model="tags"
        disabled
        placeholder="Disabled"
      />
    </FormField>
  </Form>
</template>
