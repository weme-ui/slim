import { useLocalStorage } from '@vueuse/core'
import { isRawColor, type ThemeRadius, type ThemeScaling } from '@weme-ui/utilities'

export type ThemeValue = 'default' | string
export type ThemeAppearanceValue = 'auto' | 'light' | 'dark'
export type ThemeRadiusValue = 'default' | ThemeRadius
export type ThemeScalingValue = 'default' | ThemeScaling
export type ThemeAccentValue = 'default' | (string & {})
export type ThemeNeutralValue = 'default' | (string & {})

export interface ThemePreferences {
  theme: ThemeValue
  appearance: ThemeAppearanceValue
  radius: ThemeRadiusValue
  scaling: ThemeScalingValue
  accent: ThemeAccentValue
  neutral: ThemeNeutralValue
}

export function useTheme() {
  const preferences = useLocalStorage<ThemePreferences>('weme-theme-preferences', {
    theme: 'default',
    appearance: 'auto',
    radius: 'default',
    scaling: 'default',
    accent: 'default',
    neutral: 'default',
  })

  const getThemeColor = (color: string) => {
    if (color === 'default') {
      return undefined
    }

    return isRawColor(color) ? color : `var(--${color}-9)`
  }

  return {
    preferences,
    getThemeColor,
  }
}
