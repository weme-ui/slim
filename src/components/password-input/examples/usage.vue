<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PasswordInput from '../password-input.vue'

const defaultValues = {
  password: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="password" label="Password">
      <PasswordInput
        :model-value="field.state.value"
        placeholder="Enter password"
        toggle-visibility
        @change="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
