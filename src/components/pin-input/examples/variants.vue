<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PinInput from '../pin-input.vue'

const defaultValues = {
  soft: [] as string[],
  outline: [] as string[],
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <PinInput variant="soft" />
    </FormField>
    <FormField name="outline" label="Outline">
      <PinInput variant="outline" />
    </FormField>
  </Form>
</template>
