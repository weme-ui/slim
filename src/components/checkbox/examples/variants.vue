<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Checkbox from '../checkbox.vue'

const defaultValues = {
  soft: true,
  outline: true,
  card: true,
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField v-slot="{ field }" name="soft">
      <Checkbox
        variant="soft"
        label="Soft"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <FormField v-slot="{ field }" name="outline">
      <Checkbox
        variant="outline"
        label="Outline"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <FormField v-slot="{ field }" name="card">
      <Checkbox
        variant="card"
        label="Card"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
