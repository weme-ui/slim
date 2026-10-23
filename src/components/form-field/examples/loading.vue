<script lang="ts" setup>
import Form from '../../form/form.vue'
import Input from '../../input/input.vue'
import FormField from '../form-field.vue'

const defaultValues = {
  email: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="email" label="Email" loading>
      <Input
        :model-value="field.state.value"
        type="email"
        placeholder="you@example.com"
      />
    </FormField>
  </Form>
</template>
