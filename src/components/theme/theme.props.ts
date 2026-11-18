import type {
  ThemeAppearanceValue,
  ThemeRadiusValue,
  ThemeScalingValue,
  ThemeValue,
} from '~/composables/use-theme'

export interface ThemeProps {
  name?: ThemeValue
  appearance?: ThemeAppearanceValue
  radius?: ThemeRadiusValue
  scaling?: ThemeScalingValue
}
