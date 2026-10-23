<script lang="ts" setup>
import * as v from 'valibot'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Input from '../../input/input.vue'
import Form from '../form.vue'

const schema = v.object({
  email: v.pipe(
    v.string('邮箱不能为空'),
    v.email('邮箱格式不正确'),
  ),
})

const defaultValues = {
  email: '',
}

function onFormSubmit(values: { email: string }) {
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
      name="email"
      label="Email"
      description="Please enter your email address"
      hint="Yolo"
      help="We will never share your email with anyone else."
      required
    >
      <Input
        :model-value="field.state.value"
        type="email"
        placeholder="you@example.com"
        @blur="field.api.handleBlur"
        @update:model-value="field.api.handleChange"
      />
    </FormField>

    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
