<script lang="ts" setup>
import * as v from 'valibot'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Textarea from '../textarea.vue'

const schema = v.object({
  bio: v.pipe(
    v.string('简介不能为空'),
    v.minLength(10, '至少写 10 个字'),
  ),
})

const defaultValues = {
  bio: '',
}

function onFormSubmit(values: { bio: string }) {
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
      name="bio"
      label="Bio"
      required
    >
      <Textarea
        :model-value="field.state.value"
        :max-length="100"
        placeholder="Tell us about yourself…"
        countable
        @blur="field.api.handleBlur"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
