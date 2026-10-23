<script lang="ts" setup>
import Form from '../../form/form.vue'
import Input from '../../input/input.vue'
import FormField from '../form-field.vue'

const defaultValues = {
  email: 'user@example.com',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="email" label="Email" disabled>
      <Input
        type="email"
        :model-value="field.state.value"
        @blur="field.api.handleBlur"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
