import theme from '../theme'

type ThemeSection = keyof typeof theme
type ColorSection = keyof typeof theme.colors
type FontSizeKey = keyof typeof theme.fontSize
type FontFamilyKey = keyof typeof theme.fontFamily
type BoxShadowKey = keyof typeof theme.boxShadow
type BorderRadiusKey = keyof typeof theme.borderRadius

/**
 * Utility function to get theme values from the theme object
 * @param section - The section of the theme to get (colors, fontSize, etc.)
 * @param key - The key in the section to get
 * @param subKey - The subkey in nested objects like colors
 * @returns The theme value
 */
export function getTheme(
  section: 'colors',
  key: ColorSection,
  subKey: keyof (typeof theme.colors)[ColorSection],
): string
export function getTheme(section: 'fontSize', key: FontSizeKey): string
export function getTheme(section: 'fontFamily', key: FontFamilyKey): string
export function getTheme(section: 'boxShadow', key: BoxShadowKey): string
export function getTheme(section: 'borderRadius', key: BorderRadiusKey): string
export function getTheme(section: ThemeSection, key: string, subKey?: string): string {
  if (section === 'colors' && subKey) {
    const colorValue =
      theme.colors[key as ColorSection][subKey as keyof (typeof theme.colors)[ColorSection]]
    return colorValue
  }

  const value = theme[section][key as keyof (typeof theme)[typeof section]]
  return value
}

export default theme
