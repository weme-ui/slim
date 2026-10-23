<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PasswordInput from '../password-input.vue'

const defaultValues = {
  password: 'secret',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="password" label="Password">
      <PasswordInput
        toggle-visibility
        disabled
        :model-value="field.state.value"
        placeholder="Disabled"
      />
    </FormField>
  </Form>
</template>
