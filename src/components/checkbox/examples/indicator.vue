<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Checkbox from '../checkbox.vue'

const defaultValues = {
  start: true,
  end: true,
  none: true,
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField v-slot="{ field }" name="start">
      <Checkbox
        indicator="start"
        label="Start"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <FormField v-slot="{ field }" name="end">
      <Checkbox
        indicator="end"
        label="End"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <FormField v-slot="{ field }" name="none">
      <Checkbox
        indicator="none"
        label="None"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
