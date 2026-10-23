<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import CheckboxGroup from '../checkbox-group.vue'

const defaultValues = {
  notifications: [] as string[],
}

const items: CheckboxGroupItem[] = [
  {
    label: 'Email',
    value: 'email',
    description: 'Get notified via email.',
  },
  {
    label: 'Push',
    value: 'push',
    description: 'Get push notifications on your devices.',
  },
  {
    label: 'SMS',
    value: 'sms',
    description: 'Get text messages for important updates.',
  },
]
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="notifications" label="Notifications">
      <CheckboxGroup
        :model-value="field.state.value"
        :items="items"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
