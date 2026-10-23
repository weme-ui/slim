<script lang="ts" setup>
import * as v from 'valibot'
import Button from '../../button/button.vue'
import FormField from '../../form-field/form-field.vue'
import Input from '../../input/input.vue'
import Form from '../form.vue'

const schema = v.object({
  email: v.pipe(
    v.string('Email is required'),
    v.email('Enter a valid email'),
  ),
})

const submitDefaults = {
  email: '',
}

const changeDefaults = {
  email: '',
}
</script>

<template>
  <div class="flex flex-col gap-8 max-w-sm w-full">
    <Form
      :default-values="submitDefaults"
      :schema="schema"
      validation-mode="onSubmit"
    >
      <FormField
        v-slot="{ field }"
        name="email"
        label="onSubmit"
        description="Validate when you submit"
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

    <Form
      :default-values="changeDefaults"
      :schema="schema"
      validation-mode="onChange"
    >
      <FormField
        v-slot="{ field }"
        name="email"
        label="onChange"
        description="Validate as you type"
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
  </div>
</template>
