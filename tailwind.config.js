/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
        r2: '#DA4933',
        r3: '#E88D80',
        r4: '#F6D1CC',
      },
      fontFamily: {
        regular: ['NexonGothicRegular'],
        bold: ['NexonGothicBold'],
      },
    },
  },
  plugins: [],
};
