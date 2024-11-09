/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      backgroundImage: {
        'confetti-pattern': "url('/patterns/confetti.svg')",
        'dots-pattern': "url('/patterns/dots.svg')",
        'waves-pattern': "url('/patterns/waves.svg')",
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        kiddo: {
          "primary": "#4C8BF5",
          "primary-focus": "#2D6FE7",
          "primary-content": "#ffffff",
          
          "secondary": "#FF6B9B",
          "secondary-focus": "#FF3D7F",
          "secondary-content": "#ffffff",
          
          "accent": "#2ECC71",
          "accent-focus": "#27AE60",
          "accent-content": "#ffffff",
          
          "neutral": "#2C3E50",
          "neutral-focus": "#1a252f",
          "neutral-content": "#ffffff",
          
          "base-100": "#ffffff",
          "base-200": "#F8FAFC",
          "base-300": "#E2E8F0",
          "base-content": "#1e293b",
          
          "info": "#3498DB",
          "success": "#2ECC71",
          "warning": "#F1C40F",
          "error": "#E74C3C",
          
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": ".2s",
          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
      },
      {
        cyberpunk: {
          "primary": "#FF00FF",
          "primary-focus": "#D100D1",
          "primary-content": "#000000",
          
          "secondary": "#00FFFF",
          "secondary-focus": "#00D1D1",
          "secondary-content": "#000000",
          
          "accent": "#FFFF00",
          "accent-focus": "#D1D100",
          "accent-content": "#000000",
          
          "neutral": "#1A1A1A",
          "neutral-focus": "#000000",
          "neutral-content": "#ffffff",
          
          "base-100": "#000000",
          "base-200": "#0D0D0D",
          "base-300": "#1A1A1A",
          "base-content": "#00FFFF",
          
          "info": "#00FFFF",
          "success": "#00FF00",
          "warning": "#FFFF00",
          "error": "#FF0000",
          
          "--rounded-box": "0",
          "--rounded-btn": "0",
          "--rounded-badge": "0",
          "--animation-btn": "0.15s",
          "--animation-input": ".1s",
          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "2px",
        },
      },
      {
        aqua: {
          "primary": "#00B4D8",
          "primary-focus": "#0096B4",
          "primary-content": "#ffffff",
          
          "secondary": "#48CAE4",
          "secondary-focus": "#3AA6C0",
          "secondary-content": "#ffffff",
          
          "accent": "#90E0EF",
          "accent-focus": "#72B4C3",
          "accent-content": "#1e293b",
          
          "neutral": "#023E8A",
          "neutral-focus": "#012D66",
          "neutral-content": "#ffffff",
          
          "base-100": "#CAF0F8",
          "base-200": "#ADE8F4",
          "base-300": "#90E0EF",
          "base-content": "#03045E",
          
          "info": "#0077B6",
          "success": "#2ECC71",
          "warning": "#FFB703",
          "error": "#DC2F02",
          
          "--rounded-box": "2rem",
          "--rounded-btn": "1rem",
          "--rounded-badge": "2rem",
          "--animation-btn": "0.3s",
          "--animation-input": ".2s",
          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "2px",
        },
      },
      "dark",
      "cupcake",
      "garden",
      "retro",
    ],
  },
};