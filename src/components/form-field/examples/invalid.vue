<script lang="ts" setup>
import Form from '../../form/form.vue'
import Input from '../../input/input.vue'
import FormField from '../form-field.vue'

const defaultValues = {
  email: 'not-an-email',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="email" label="Email" invalid help="Enter a valid email address.">
      <Input
        type="email"
        :model-value="field.state.value"
        placeholder="you@example.com"
      />
    </FormField>
  </Form>
</template>
