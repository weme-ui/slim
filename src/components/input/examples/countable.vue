<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const defaultValues = {
  bio: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="bio" label="Bio">
      <Input
        countable
        :max-length="32"
        :model-value="field.state.value"
        placeholder="Up to 32 characters"
        @change="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
