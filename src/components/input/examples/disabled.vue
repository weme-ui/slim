<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const defaultValues = {
  name: 'Disabled',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="name" label="Name">
      <Input
        disabled
        :model-value="field.state.value"
        placeholder="Disabled"
      />
    </FormField>
  </Form>
</template>
