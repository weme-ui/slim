<script lang="ts" setup>
import Form from '../../form/form.vue'
import Input from '../../input/input.vue'
import FormField from '../form-field.vue'

const defaultValues = {
  displayName: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField
      v-slot="{ field }"
      name="displayName"
      label="Display name"
      description="Shown on your public profile."
    >
      <Input
        :model-value="field.state.value"
        placeholder="Display name"
        @blur="field.api.handleBlur"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
