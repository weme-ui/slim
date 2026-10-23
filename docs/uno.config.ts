import { mergeConfigs } from 'unocss'
import config from '../uno.config'

const steps = Array.from({ length: 12 }, (_, index) => index + 1)

export default mergeConfigs([
  config,
  {
    safelist: steps.flatMap(step => [
      `bg-accent-${step}`,
      `bg-neutral-${step}`,
    ]),
  },
])
