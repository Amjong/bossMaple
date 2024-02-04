const { searchBgSrc } = require('./src/data/image/encodedImage');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
      sm: { max: '480px' },
      // => @media (max-width: 480px) { ... }
    },
    extend: {
      fontSize: {
        '3xl': '48px',
        '2xl': '36px',
        xl: '24px',
        lg: '16px',
        md: '12px',
      },
      colors: {
        y1: '#FFC700',
        y2: '#FFD233',
        y4: '#FFE380',
        y5: '#FFF4CC',
        r1: '#D11B00',
        r2: '#D74652',
        r3: '#E88D80',
        r4: '#F6D1CC',
        n0: '#1A202C',
        n1: '#282C47',
        n2: '#53566C',
        black: '#1E1E1E',
        white: '#FFFFFF',
      },
      fontFamily: {
        regular: ['NexonGothicRegular'],
        bold: ['NexonGothicBold'],
      },
      backgroundImage: {
        custom: `url(${searchBgSrc})`,
        fixed: 'fixed',
        cover: 'cover',
      },
    },
  },
  plugins: [],
};
