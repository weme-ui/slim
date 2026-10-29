<script lang="ts" setup>
import * as v from 'valibot'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Checkbox from '../checkbox.vue'

const schema = v.object({
  terms: v.literal(true, '请同意条款'),
})

const defaultValues = {
  terms: false,
}

function onFormSubmit(values: { terms: boolean }) {
  // eslint-disable-next-line no-alert
  alert(JSON.stringify(values))
}
</script>

<template>
  <Form
    class="max-w-sm w-full"
    :default-values="defaultValues"
    :schema="schema"
    @form-submit="onFormSubmit"
  >
    <FormField v-slot="{ field }" label="Privacy Policy" name="terms" required>
      <Checkbox
        :model-value="field.state.value"
        label="Accept terms and conditions"
        description="By accepting, you agree to the terms and conditions"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
