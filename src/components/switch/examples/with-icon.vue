<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Switch from '../switch.vue'

const defaultValues = {
  theme: true,
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="theme" label="Theme">
      <Switch
        checked-icon="ri:moon-line"
        unchecked-icon="ri:sun-line"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
