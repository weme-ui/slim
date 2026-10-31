<script lang="ts" setup>
import { TooltipProvider } from 'reka-ui'
import * as v from 'valibot'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Slider from '../slider.vue'

const schema = v.object({
  volume: v.array(v.number()),
})

const defaultValues = {
  volume: [40],
}

function onFormSubmit(values: { volume: number[] }) {
  // eslint-disable-next-line no-alert
  alert(JSON.stringify(values))
}
</script>

<template>
  <TooltipProvider>
    <Form
      class="max-w-sm w-full"
      :default-values="defaultValues"
      :schema="schema"
      @form-submit="onFormSubmit"
    >
      <FormField
        v-slot="{ field }"
        name="volume"
        label="Volume"
      >
        <Slider
          :model-value="field.state.value"
          show-steps
          show-marks
          @update:model-value="field.api.handleChange"
        />
      </FormField>
      <Button type="submit">
        Submit
      </Button>
    </Form>
  </TooltipProvider>
</template>
