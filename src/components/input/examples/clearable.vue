<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const defaultValues = {
  name: 'Weme UI',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="name" label="Name">
      <Input
        clearable
        :model-value="field.state.value"
        placeholder="Clearable"
        @change="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
