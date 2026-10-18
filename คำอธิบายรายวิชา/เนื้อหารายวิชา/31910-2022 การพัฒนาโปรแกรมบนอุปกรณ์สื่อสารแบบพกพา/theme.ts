/**
 * Red Broadcast Design System - Design Tokens (TypeScript)
 * Extracted from design.md
 * 
 * Ready to be imported in React, React Native, Vue, or Web applications.
 */

export const colors = {
  primary: {
    default: '#FF0000',
    hover: '#CC0000',
  },
  secondary: {
    default: '#065FD4',
  },
  neutral: {
    default: '#606060',
  },
  background: {
    default: '#FFFFFF',
  },
  surface: {
    default: '#F2F2F2',
    hover: '#E5E5E5',
    search: '#F8F8F8',
  },
  text: {
    primary: '#0F0F0F',
    secondary: '#606060',
    inverse: '#FFFFFF',
  },
  border: {
    default: '#E5E5E5',
    dark: '#0F0F0F',
  },
  status: {
    success: '#2BA640',
    warning: '#FB8C00',
    error: '#FF0000',
  },
  overlay: {
    badge: 'rgba(0, 0, 0, 0.6)',
    modal: 'rgba(0, 0, 0, 0.3)',
  },
} as const;

export const typography = {
  fonts: {
    display: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    code: "'Roboto Mono', monospace",
  },
  weights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  styles: {
    pageTitle: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 700,
    },
    sectionTitle: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 500,
    },
    videoTitleWatch: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 700,
    },
    videoTitleGrid: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
      maxLines: 2,
    },
    channelName: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
    },
    body: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
    },
    bodySmall: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: 400,
    },
    metadata: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
    },
    label: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    button: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
    },
    code: {
      fontFamily: "'Roboto Mono', monospace",
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
    },
  },
} as const;

export const spacing = {
  unit: 8,
  scale: {
    '0.5': '4px',
    '1': '8px',
    '1.5': '12px',
    '2': '16px',
    '3': '24px',
    '4': '32px',
    '6': '48px',
    '8': '64px',
  },
  padding: {
    component: '12px',
    sidebarItem: '16px',
    section: '24px',
    badge: '4px 8px',
    chip: '8px 12px',
  },
  grid: {
    gapHorizontal: '16px',
    gapVertical: '40px',
    minColumnWidth: '320px',
  },
  layout: {
    containerMaxWidth: '2200px',
    topBarHeight: '56px',
    sidebarExpandedWidth: '240px',
    sidebarCollapsedWidth: '72px',
    searchBarHeight: '44px',
    searchButtonWidth: '64px',
    buttonHeight: '36px',
    iconButtonSize: '40px',
    avatarChannel: '36px',
    avatarComment: '40px',
    checkboxSize: '18px',
    listThumbnailWidth: '168px',
    listThumbnailHeight: '94px',
    threadedReplyIndent: '56px',
  },
} as const;

export const borderRadius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px',
} as const;

export const shadows = {
  elevation0: 'none',
  elevation1: '0 1px 2px rgba(0, 0, 0, 0.1)',
  elevation2: '0 4px 32px rgba(0, 0, 0, 0.1)',
  elevation3: '0 8px 40px rgba(0, 0, 0, 0.2)',
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;
export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;

export default theme;
