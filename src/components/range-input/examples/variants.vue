<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import RangeInput from '../range-input.vue'

const defaultValues = {
  soft: [0, 10] as [number, number],
  outline: [0, 10] as [number, number],
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <RangeInput variant="soft" from-placeholder="Min" to-placeholder="Max" />
    </FormField>
    <FormField name="outline" label="Outline">
      <RangeInput variant="outline" from-placeholder="Min" to-placeholder="Max" />
    </FormField>
  </Form>
</template>
