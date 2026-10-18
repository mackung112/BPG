/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js,ts,jsx,tsx,vue,svelte}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF0000',
          hover: '#CC0000',
        },
        secondary: {
          DEFAULT: '#065FD4',
        },
        neutral: {
          DEFAULT: '#606060',
        },
        background: {
          DEFAULT: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#F2F2F2',
          hover: '#E5E5E5',
          search: '#F8F8F8',
        },
        text: {
          primary: '#0F0F0F',
          secondary: '#606060',
          inverse: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E5E5E5',
          dark: '#0F0F0F',
        },
        status: {
          success: '#2BA640',
          warning: '#FB8C00',
          error: '#FF0000',
        },
      },
      fontFamily: {
        display: ['Roboto', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        code: ['"Roboto Mono"', 'monospace'],
      },
      fontSize: {
        'page-title': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'section-title': ['20px', { lineHeight: '28px', fontWeight: '500' }],
        'watch-title': ['20px', { lineHeight: '28px', fontWeight: '700' }],
        'video-title': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'channel-name': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'body': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '18px', fontWeight: '400' }],
        'metadata': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '16px', letterSpacing: '0.02em', fontWeight: '500' }],
        'btn': ['14px', { lineHeight: '20px', fontWeight: '500' }],
      },
      spacing: {
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '6': '48px',
        '8': '64px',
        'topbar': '56px',
        'sidebar': '240px',
        'sidebar-collapsed': '72px',
      },
      borderRadius: {
        'none': '0px',
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'full': '9999px',
      },
      boxShadow: {
        'elevation-0': 'none',
        'elevation-1': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'elevation-2': '0 4px 32px rgba(0, 0, 0, 0.1)',
        'elevation-3': '0 8px 40px rgba(0, 0, 0, 0.2)',
      },
      aspectRatio: {
        'video': '16 / 9',
      },
      maxWidth: {
        'content': '2200px',
      },
      minWidth: {
        'grid-col': '320px',
      },
    },
  },
  plugins: [],
};
