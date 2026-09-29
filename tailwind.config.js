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
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        gov: {
          green: '#15803d',
          greenHover: '#166534',
          greenLight: '#16a34a',
          faintGreen: '#f0fdf4',
          mint: '#dcfce7',
          surface: '#ffffff',
          bg: '#f8fafc',
          border: '#e2e8f0',
          borderGreen: '#bbf7d0',
          textDark: '#0f172a',
          textMuted: '#64748b',
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
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'xs': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 12px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -2px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 12px 28px -4px rgba(16, 185, 129, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'elevated': '0 12px 30px -4px rgba(0, 0, 0, 0.08), 0 4px 10px -4px rgba(0, 0, 0, 0.04)',
        'glow-emerald': '0 0 25px -4px rgba(16, 185, 129, 0.25)',
        'glow-mint': '0 0 35px -6px rgba(52, 211, 153, 0.3)',
      }
    },
  },
  plugins: [],
}
