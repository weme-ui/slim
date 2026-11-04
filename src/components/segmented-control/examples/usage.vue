<script lang="ts" setup>
import type { SegmentedControlItem } from '../segmented-control.props'
import * as v from 'valibot'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import SegmentedControl from '../segmented-control.vue'

const schema = v.object({
  range: v.pipe(
    v.string(),
    v.minLength(1, '请选择一项'),
  ),
})

const defaultValues = {
  range: 'week',
}

const items: SegmentedControlItem[] = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]

function onFormSubmit(values: { range: string }) {
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
      name="range"
      label="Range"
      :native-label="false"
      required
    >
      <SegmentedControl
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
