<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { ref } from 'vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagsInput from '../tags-input.vue'

const defaultValues = {
  sm: '',
  md: '',
  lg: '',
}

const sm = ref<TagsInputValue[]>(['sm'])
const md = ref<TagsInputValue[]>(['md'])
const lg = ref<TagsInputValue[]>(['lg'])
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="sm" label="SM">
      <TagsInput v-model="sm" size="sm" placeholder="Small" />
    </FormField>
    <FormField name="md" label="MD">
      <TagsInput v-model="md" size="md" placeholder="Medium" />
    </FormField>
    <FormField name="lg" label="LG">
      <TagsInput v-model="lg" size="lg" placeholder="Large" />
    </FormField>
  </Form>
</template>
