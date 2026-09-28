/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          green: '#15803d',        // Official Govt Green (Green-700)
          greenHover: '#166534',   // Darker green hover
          greenLight: '#16a34a',   // Bright green accent
          faintGreen: '#f0fdf4',   // Very faint green background (Green-50)
          mint: '#dcfce7',         // Soft mint pill (Green-100)
          surface: '#ffffff',      // Pure white card
          bg: '#f8fafc',           // Soft off-white page background (Slate-50)
          border: '#e2e8f0',       // Clean subtle border (Slate-200)
          borderGreen: '#bbf7d0',  // Faint green border
          textDark: '#0f172a',     // Dark slate text (Slate-900)
          textMuted: '#64748b',    // Muted slate text (Slate-500)
        },
        status: {
          eligible: '#15803d',
          eligibleBg: '#f0fdf4',
          eligibleBorder: '#86efac',
          review: '#b45309',
          reviewBg: '#fffbeb',
          reviewBorder: '#fde68a',
          ineligible: '#b91c1c',
          ineligibleBg: '#fef2f2',
          ineligibleBorder: '#fecaca',
          potential: '#1d4ed8',
          potentialBg: '#eff6ff',
          potentialBorder: '#bfdbfe',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
        'green-soft': '0 4px 14px 0 rgba(22, 163, 74, 0.15)',
      }
    },
  },
  plugins: [],
}
