/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'telegram-blue': '#3390ec',
        'telegram-light-blue': '#e3f2fd',
        'text-muted': '#707579',
        'bg-light': '#f8f9fa',
        'border-light': '#dee2e6',
        'success': '#4fae4e',
        'danger': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      maxWidth: {
        '3/4': '75%',
      },
      width: {
        '11': '2.75rem',
        '44': '11rem',
      },
      height: {
        '11': '2.75rem',
        '44': '11rem',
      },
      fontSize: {
        '2xs': '0.6875rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}