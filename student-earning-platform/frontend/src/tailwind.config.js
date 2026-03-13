/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors from Design Document
        primary: {
          DEFAULT: '#7C3AED', // Main Purple
          light: '#A78BFA',
          dark: '#5B21B6',
        },
        accent: {
          DEFAULT: '#F97316', // Main Orange
          light: '#FDBA74',
          dark: '#C2410C',
        },
        // Neutral Colors from Design Document
        dark: '#111827',    // Text
        muted: '#4B5563',   // Secondary Text
        border: '#E5E7EB',  // Borders
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}