<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Checkbox from '../checkbox.vue'

const defaultValues = {
  marketing: false,
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="marketing">
      <Checkbox
        label="Marketing emails"
        description="Receive occasional product updates and offers."
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
