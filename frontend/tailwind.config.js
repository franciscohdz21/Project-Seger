// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* modern teal-slate palette  */
        brand: {
          50 :  '#ecfdf5',
          100:  '#d1fae5',
          200:  '#a7f3d0',
          300:  '#6ee7b7',
          400:  '#34d399',
          500:  '#10b981',   // primary
          600:  '#059669',
          700:  '#047857',
          800:  '#065f46',
          900:  '#064e3b',
        },
        base: {
          100: '#ffffff',     // card / panel background
          200: '#f3f4f6',     // page background (gray-100)
        }
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.05)',     // soft elevation
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
};
