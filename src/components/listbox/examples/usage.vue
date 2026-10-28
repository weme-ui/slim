<script lang="ts" setup>
import type { ListboxItems } from '../listbox.props'
import * as v from 'valibot'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Listbox from '../listbox.vue'

const schema = v.object({
  drink: v.pipe(
    v.string('请选择饮品'),
    v.minLength(1, '请选择饮品'),
  ),
})

const defaultValues = {
  drink: '',
}

const items: ListboxItems = [
  { label: 'Beer', value: 'beer', icon: 'ri:beer-line' },
  { label: 'Coffee', value: 'coffee', icon: 'ri:drinks-line' },
  { label: 'Juice', value: 'juice', icon: 'ri:goblet-line' },
  { label: 'Wine', value: 'wine', icon: 'ri:goblet-2-line' },
]

function onFormSubmit(values: { drink: string }) {
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
      name="drink"
      label="Drink"
      required
    >
      <Listbox
        :model-value="field.state.value"
        :items="items"
        placeholder="Search drinks…"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
