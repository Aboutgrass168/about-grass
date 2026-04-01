const theme = {
  colors: {
    Blue: {
      0: '#f5f8ff',
      100: '#ccd7f2',
      200: '#6784c9',
      300: '#203568',
    },
    Gold: {
      0: '#fffcf5',
      100: '#f7d999',
      200: '#cd9e3a',
      300: '#87610e',
    },
    Support: {
      0: '#f9ffeb',
      100: '#e5f2c4',
      200: '#b7d07c',
      300: '#5f8700',
    },
    Grayscale: {
      0: '#fafbff',
      100: '#f2f5fb',
      200: '#e8ebf3',
      300: '#d9dde6',
      400: '#c7cbd4',
      500: '#afb2bc',
      600: '#90939b',
      700: '#6a6c72',
      800: '#3e3f43',
      900: '#242628',
    },
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1.125rem',
    lg: '1.4375rem',
    xl: '1.75rem',
    '2xl': '2.1875rem',
    '3xl': '2.75rem',
    '4xl': '3.4375rem',
    '5xl': '4.3125rem',
  },
  fontFamily: {
    'sukhumvit-set': ['Sukhumvit Set', 'sans-serif'],
    'helvetica-neue': ['Helvetica Neue', 'sans-serif'],
  },
  boxShadow: {
    'drop-shadow': '8px 8px 32px 0px rgba(32,53,104,0.3)',
  },
  borderRadius: {
    'rounded-0': '0rem', // ต้องเปลี่ยนจาก NaNrem เป็นค่าที่ถูกต้อง
    'rounded-1': '0.25rem',
    'rounded-2': '0.5rem',
    'rounded-3': '1rem',
  },
}

module.exports = {
  theme: {
    extend: theme, // นำ `theme` ที่กำหนดมา extend ใน Tailwind
  },
  plugins: [],
}
