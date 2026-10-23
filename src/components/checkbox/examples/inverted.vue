<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Checkbox from '../checkbox.vue'

const defaultValues = {
  default: true,
  inverted: true,
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField v-slot="{ field }" name="default">
      <Checkbox
        label="Default"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <FormField v-slot="{ field }" name="inverted">
      <Checkbox
        inverted
        label="Inverted"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
