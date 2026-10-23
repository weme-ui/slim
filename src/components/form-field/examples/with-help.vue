<script lang="ts" setup>
import Form from '../../form/form.vue'
import Input from '../../input/input.vue'
import FormField from '../form-field.vue'

const defaultValues = {
  bio: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField
      v-slot="{ field }"
      name="bio"
      label="Bio"
      help="Keep it under 160 characters."
    >
      <Input
        :model-value="field.state.value"
        placeholder="Short bio"
        @blur="field.api.handleBlur"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
