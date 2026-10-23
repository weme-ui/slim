<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const defaultValues = {
  email: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="email" label="Email">
      <Input
        :model-value="field.state.value"
        type="email"
        radius="full"
        size="md"
        variant="outline"
        prefix-icon="ri:mail-line"
        placeholder="You@example.com"
        @change="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
