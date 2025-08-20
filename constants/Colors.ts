/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Primary accent red + black theme
const tintColorLight = '#e50914';
const tintColorDark = '#e50914';

// Extended palette & semantic colors
export const palette = {
  primary: '#e50914',
  primaryDark: '#b00710',
  accent: '#e50914',
  accentDark: '#b00710',
  success: '#21d07a',
  danger: '#ff4d4f',
  warning: '#ffa502',
  info: '#2979ff',
  gray50: '#0d0d0d',
  gray100: '#141414',
  gray200: '#1e1e1e',
  gray300: '#262626',
  gray400: '#333333',
  gray500: '#555555',
  gray600: '#6b6b6b',
  gray700: '#888888',
  gray800: '#b3b3b3',
  gray900: '#e6e6e6',
  gradientStart: '#000000',
  gradientEnd: '#2a0002',
};

export const Colors = {
  light: {
    text: '#ffffff',
    background: '#000000',
    surface: '#141414',
    surfaceMuted: '#1e1e1e',
    border: '#262626',
    tint: tintColorLight,
    accent: palette.accent,
    danger: palette.danger,
    success: palette.success,
    icon: '#b3b3b3',
    placeholder: '#666666',
    cardShadow: 'rgba(0,0,0,0.6)',
    tabIconDefault: '#666666',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    surface: '#141414',
    surfaceMuted: '#1e1e1e',
    border: '#262626',
    tint: tintColorDark,
    accent: palette.accent,
    danger: palette.danger,
    success: palette.success,
    icon: '#b3b3b3',
    placeholder: '#666666',
    cardShadow: 'rgba(0,0,0,0.6)',
    tabIconDefault: '#666666',
    tabIconSelected: tintColorDark,
  },
};
