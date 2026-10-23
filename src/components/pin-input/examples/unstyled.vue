<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PinInput from '../pin-input.vue'

const defaultValues = {
  code: [] as string[],
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField name="code" label="Custom Styled">
      <PinInput
        unstyled
        class="flex gap-2"
        :ui="{
          input: 'size-10 text-center border-b b-base outline-none focus:b-accent',
        }"
      />
    </FormField>
  </Form>
</template>
