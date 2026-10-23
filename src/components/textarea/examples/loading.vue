<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Textarea from '../textarea.vue'

const defaultValues = {
  notes: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField name="notes" label="Notes">
      <Textarea loading placeholder="Loading…" />
    </FormField>
  </Form>
</template>
