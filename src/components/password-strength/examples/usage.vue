<script lang="ts" setup>
import * as v from 'valibot'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PasswordInput from '../../password-input/password-input.vue'
import PasswordStrength from '../password-strength.vue'

const schema = v.object({
  password: v.pipe(
    v.string('密码不能为空'),
    v.minLength(8, '至少 8 位'),
  ),
})

const defaultValues = {
  password: '',
}

function onFormSubmit(values: { password: string }) {
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
      name="password"
      label="Password"
      required
    >
      <PasswordStrength
        :password="String(field.state.value ?? '')"
        show-message
      >
        <PasswordInput
          :model-value="field.state.value"
          placeholder="Enter password"
          toggle-visibility
          @blur="field.api.handleBlur"
          @update:model-value="field.api.handleChange"
        />
      </PasswordStrength>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
