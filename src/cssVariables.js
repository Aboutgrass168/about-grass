// Keep these in sync with the CSS variables in your tailwind configuration

import theme from './theme'

export const cssVariables = {
  '--background': theme.colors.Grayscale['0'],
  '--foreground': theme.colors.Grayscale['900'],
  '--primary': theme.colors.Blue['300'],
  '--primary-foreground': '#FFFFFF',
  '--secondary': theme.colors.Gold['200'],
  '--secondary-foreground': theme.colors.Grayscale['900'],
  '--accent': theme.colors.Support['200'],
  '--accent-foreground': theme.colors.Grayscale['900'],
  '--muted': theme.colors.Grayscale['200'],
  '--muted-foreground': theme.colors.Grayscale['700'],
  '--card': theme.colors.Grayscale['0'],
  '--card-foreground': theme.colors.Grayscale['900'],
  '--popover': theme.colors.Grayscale['0'],
  '--popover-foreground': theme.colors.Grayscale['900'],
  '--border': theme.colors.Grayscale['300'],
  '--input': theme.colors.Grayscale['300'],
  '--ring': theme.colors.Blue['200'],
  '--radius': theme.borderRadius['rounded-2'],
  breakpoints: {
    '3xl': 1920,
    '2xl': 1536,
    xl: 1280,
    lg: 1024,
    md: 768,
    sm: 640,
  },
}

export default cssVariables
