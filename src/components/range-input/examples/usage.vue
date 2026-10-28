<script lang="ts" setup>
import type { RangeInputValue } from '../range-input.props'
import * as v from 'valibot'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import RangeInput from '../range-input.vue'

const schema = v.object({
  price: v.pipe(
    v.tuple([
      v.number(),
      v.number(),
    ]),
    v.check(([from, to]) => from <= to, '最低价不能高于最高价'),
  ),
})

const defaultValues = {
  price: [80, 20] as RangeInputValue,
}

function onFormSubmit(values: { price: RangeInputValue }) {
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
      name="price"
      label="Price"
      required
    >
      <RangeInput
        :model-value="field.state.value"
        from-placeholder="Min"
        to-placeholder="Max"
        @blur="field.api.handleBlur"
        @change="field.api.handleChange"
      />
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
