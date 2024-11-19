import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rethink: ['Rethink Sans', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: ['sunset', 'light'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    base: true, // applies background color and foreground color for root element by default
    styled: true,
    utils: true,
    logs: false,
  },
};
