<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PinInput from '../pin-input.vue'

const defaultValues = {
  code: ['1', '2', '3', '4'],
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="code" label="Verification code">
      <PinInput
        disabled
        :model-value="field.state.value"
      />
    </FormField>
  </Form>
</template>
