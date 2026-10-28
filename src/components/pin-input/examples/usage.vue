<script lang="ts" setup>
import * as v from 'valibot'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PinInput from '../pin-input.vue'

const schema = v.object({
  code: v.pipe(
    v.array(v.string()),
    v.length(4, '请输入 4 位验证码'),
  ),
})

const defaultValues = {
  code: [] as string[],
}

function onFormSubmit(values: { code: string[] }) {
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
      name="code"
      label="Verification code"
      required
    >
      <PinInput
        :model-value="field.state.value"
        @blur="field.api.handleBlur"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
