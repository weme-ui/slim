<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import RangeInput from '../range-input.vue'

const defaultValues = {
  text: [0, 10] as [number, number],
  icon: [0, 10] as [number, number],
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="text" label="Text Separator">
      <RangeInput
        separator="to"
        from-placeholder="Min"
        to-placeholder="Max"
      />
    </FormField>
    <FormField name="icon" label="Icon Separator">
      <RangeInput
        separator-icon="ri:arrow-right-line"
        from-placeholder="Min"
        to-placeholder="Max"
      />
    </FormField>
  </Form>
</template>
