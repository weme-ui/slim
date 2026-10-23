<script lang="ts" setup>
import Form from '../../form/form.vue'
import Input from '../../input/input.vue'
import FormField from '../form-field.vue'

const defaultValues = {
  password: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="password" label="Password" hint="Optional">
      <Input
        type="password"
        :model-value="field.state.value"
        placeholder="Password"
        @blur="field.api.handleBlur"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
