import type { Config } from 'tailwindcss';

/**
 * Design tokens mirror the QuickBooks visual language:
 * - Intuit/QuickBooks green as the primary brand color
 * - Near-black ink for headings and body copy
 * - Warm neutral surfaces for alternating sections
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e9f7e7',
          100: '#c9ebc4',
          200: '#93d88a',
          300: '#5cc44f',
          400: '#37b528',
          500: '#2ca01c', // QuickBooks green
          600: '#238016',
          700: '#1a6011',
          800: '#12470c',
          900: '#0b2e08',
        },
        ink: {
          DEFAULT: '#393a3d',
          soft: '#6b6c72',
          muted: '#8d9096',
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f4f5f8',
          sand: '#faf9f7',
          dark: '#12140f',
        },
        accent: {
          mint: '#e3f4de',
          lime: '#d4f7b8',
          sky: '#e6f0ff',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 5.5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['clamp(2.25rem, 4vw, 3.25rem)', { lineHeight: '1.06', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px rgba(16, 24, 40, 0.06)',
        'card-hover': '0 2px 4px rgba(16, 24, 40, 0.06), 0 16px 40px rgba(16, 24, 40, 0.12)',
        float: '0 24px 60px rgba(16, 24, 40, 0.16)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
