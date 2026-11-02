import type { NumberFormatOptions } from '@internationalized/number'
import { NumberFormatter } from '@internationalized/number'
import { computedWithControl } from '@vueuse/core'
import { useLocale } from 'reka-ui'
import { toRef } from 'vue'

export function useNumberFormatter(options?: NumberFormatOptions) {
  const locale = useLocale()
  const optionsRef = toRef(options)

  return computedWithControl<NumberFormatter>(
    [
      locale,
      optionsRef,
    ],
    () => new NumberFormatter(locale.value, optionsRef.value),
  )
}
