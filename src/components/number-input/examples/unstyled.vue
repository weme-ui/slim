<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import NumberInput from '../number-input.vue'

const defaultValues = {
  value: 0,
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField name="value" label="Custom Styled">
      <NumberInput
        unstyled
        placeholder="Fully custom…"
        class="text-sm outline-none border-b b-base flex gap-1 w-full items-center focus-within:b-accent"
      />
    </FormField>
  </Form>
</template>
