import type { ComputedRef, Ref } from 'vue'
import { createContext } from 'reka-ui'
import { computed, ref, useAttrs } from 'vue'
import { isBoolDataAttrValue, toBoolAriaValue, toBoolDataAttrValue } from '~/utils/props'

export interface FormFieldSharedProps {
  id?: string
  name?: string
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  loading?: boolean
}

interface FormFieldControlDetail {
  value: unknown
}

interface FormFieldControlRegistration {
  id?: () => string | undefined
  element: () => HTMLElement | null | undefined
  getValue: () => unknown
}

type FormFieldDataAttributes = Record<`data-${'disabled' | 'valid' | 'invalid' | 'dirty' | 'touched' | 'filled' | 'focused'}`, '' | undefined>

export interface FormFieldContextValue {
  fieldId: ComputedRef<string | undefined>
  labelId: ComputedRef<string | undefined>
  descriptionId: ComputedRef<string | undefined>
  name: Ref<string | undefined>
  disabled: ComputedRef<boolean>
  required: Ref<boolean>
  loading: ComputedRef<boolean>
  valid: ComputedRef<boolean>
  invalid: ComputedRef<boolean>
  dirty: ComputedRef<boolean>
  touched: ComputedRef<boolean>
  filled: ComputedRef<boolean>
  focused: Ref<boolean>
  dataAttributes: ComputedRef<FormFieldDataAttributes>
  getControlId: () => string | undefined
  focusControl: () => void
  resetField: () => void
  registryControl: (control: FormFieldControlRegistration) => () => void
  handleControlFocus: () => void
  handleControlBlur: (detail?: FormFieldControlDetail) => void
}

const [
  injectFormFieldContext,
  provideFormFieldContext,
] = createContext<FormFieldContextValue>('FormField')

export { provideFormFieldContext }

export function useFormFieldContext() {
  return injectFormFieldContext(null)
}

function mergeIds(consumerValue: unknown, fieldValue: string | undefined) {
  return [consumerValue as string | undefined, fieldValue].filter(Boolean).join(' ') || undefined
}

function useFormFieldBindings() {
  const attrs = useAttrs()
  const fieldContext = useFormFieldContext()

  return computed(() => {
    const {
      'aria-describedby': describedBy,
      'aria-labelledby': labelledBy,
      'aria-invalid': ariaInvalid,
      id,
      name,
      disabled,
      required,
      class: _className,
      ...rest
    } = attrs

    if (!fieldContext) {
      return {
        ...rest,
        'id': id as string | undefined,
        'name': name as string | undefined,
        'disabled': isBoolDataAttrValue(disabled) || undefined,
        'required': isBoolDataAttrValue(required) || undefined,
        'aria-labelledby': labelledBy as string | undefined,
        'aria-describedby': describedBy as string | undefined,
        'aria-invalid': ariaInvalid
          ? toBoolAriaValue(ariaInvalid)
          : undefined,
      }
    }

    const isDisabled = fieldContext.disabled.value ?? isBoolDataAttrValue(disabled)

    return {
      ...rest,
      ...fieldContext.dataAttributes.value,
      'id': fieldContext.fieldId.value ?? id as string | undefined,
      'name': fieldContext.name.value ?? name as string | undefined,
      'disabled': isDisabled || undefined,
      'required': (fieldContext.required.value || isBoolDataAttrValue(required)) || undefined,
      'aria-labelledby': mergeIds(labelledBy, fieldContext.labelId.value),
      'aria-describedby': mergeIds(describedBy, fieldContext.descriptionId.value),
      'aria-invalid': ariaInvalid
        ? toBoolAriaValue(ariaInvalid)
        : ((fieldContext.invalid.value && !isDisabled) || undefined),
    }
  })
}

export function useFormFieldControl(props: FormFieldSharedProps) {
  const context = useFormFieldContext()
  const fieldBindings = useFormFieldBindings()
  const localFocused = ref(false)

  const id = computed(() => props.id ?? context?.fieldId.value)
  const name = computed(() => props.name ?? context?.name.value)
  const required = computed(() => props.required ?? context?.required.value)
  const loading = computed(() => props.loading ?? context?.loading.value)
  const disabled = computed(() => props.disabled ?? context?.disabled.value)
  const invalid = computed(() => props.invalid ?? context?.invalid.value)
  const focused = computed(() => context?.focused.value ?? localFocused.value)
  const dataAttributes = computed<FormFieldDataAttributes>(() => {
    if (context)
      return context.dataAttributes.value

    return {
      'data-disabled': toBoolDataAttrValue(disabled.value),
      'data-valid': undefined,
      'data-invalid': toBoolDataAttrValue(invalid.value),
      'data-dirty': undefined,
      'data-touched': undefined,
      'data-filled': undefined,
      'data-focused': toBoolDataAttrValue(focused.value),
    }
  })

  const bindings = computed(() => ({
    ...fieldBindings.value,
    'aria-invalid': fieldBindings.value['aria-invalid']
      ?? ((invalid.value && !disabled.value) || undefined),
  }))

  function registerControl(registration: FormFieldControlRegistration) {
    return context?.registryControl(registration)
  }

  function handleControlFocus() {
    if (focused.value)
      return false

    if (context) {
      context.handleControlFocus()
    }
    else if (!disabled.value && !loading.value) {
      localFocused.value = true
    }

    return true
  }

  function handleControlBlur(detail?: FormFieldControlDetail) {
    if (!focused.value)
      return false

    if (context)
      context.handleControlBlur(detail)
    else
      localFocused.value = false

    return true
  }

  return {
    bindings,
    id,
    name,
    required,
    loading,
    disabled,
    invalid,
    dataAttributes,
    registerControl,
    handleControlFocus,
    handleControlBlur,
  }
}
