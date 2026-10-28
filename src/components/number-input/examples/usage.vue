<script lang="ts" setup>
import * as v from 'valibot'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import NumberInput from '../number-input.vue'

const schema = v.object({
  quantity: v.pipe(
    v.number('数量不能为空'),
    v.minValue(1, '至少为 1'),
  ),
})

const defaultValues = {
  quantity: 0,
}

function onFormSubmit(values: { quantity: number }) {
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
    <FormField
      v-slot="{ field }"
      name="quantity"
      label="Quantity"
      required
    >
      <NumberInput
        :model-value="field.state.value"
        :min="0"
        @blur="field.api.handleBlur"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
