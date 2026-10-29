<script lang="ts" setup>
import type { RadioGroupItem } from '../radio-group.props'
import * as v from 'valibot'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import RadioGroup from '../radio-group.vue'

const schema = v.object({
  plan: v.pipe(
    v.string(),
    v.minLength(1, '请选择一项'),
  ),
})

const defaultValues = {
  plan: '',
}

const items: RadioGroupItem[] = [
  { label: 'Hobby', value: 'hobby' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
]

function onFormSubmit(values: { plan: string }) {
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
      name="plan"
      label="Plan"
      :native-label="false"
      required
    >
      <RadioGroup
        :model-value="field.state.value"
        :items="items"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
