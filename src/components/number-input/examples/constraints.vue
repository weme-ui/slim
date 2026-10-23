<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import NumberInput from '../number-input.vue'

const defaultValues = {
  amount: 10,
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField name="amount" label="Amount" description="Min 0, max 100, step 5">
      <NumberInput
        :min="0"
        :max="100"
        :step="5"
        placeholder="0"
      />
    </FormField>
  </Form>
</template>
