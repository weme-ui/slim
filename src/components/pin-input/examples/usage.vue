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
    <FormField v-slot="{ field }" name="code" label="Verification code">
      <PinInput
        :model-value="field.state.value"
        @complete="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
