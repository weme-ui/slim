<script lang="ts" setup>
import Form from '../../form/form.vue'
import Input from '../../input/input.vue'
import FormField from '../form-field.vue'

const defaultValues = {
  vertical: '',
  horizontal: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-md w-full">
    <FormField v-slot="{ field }" name="vertical" label="Vertical" orientation="vertical">
      <Input
        :model-value="field.state.value"
        placeholder="Vertical"
        @blur="field.api.handleBlur"
        @update:model-value="field.api.handleChange"
      />
    </FormField>

    <FormField v-slot="{ field }" name="horizontal" label="Horizontal" orientation="horizontal">
      <Input
        :model-value="field.state.value"
        placeholder="Horizontal"
        @blur="field.api.handleBlur"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
