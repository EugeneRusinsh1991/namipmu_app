// Palette primitives and semantic roles
export const primitives = {
  blue500: '#208AEF',
  pink600: '#C45C73',
  white: '#ffffff',
  black: '#000000',
  gray100: '#FBFAF9',
  gray200: '#F5F1ED',
  gray300: '#F7F3F0',
  gray400: '#E6DDD6',
  gray500: '#9B9087',
};

export const colors = {
  // primitives
  ...primitives,

  // semantic roles
  backgroundLight: primitives.gray100,
  secondarySurface: primitives.gray200,
  cardBackground: primitives.gray300,
  border: primitives.gray400,
  textPrimary: '#1E1714',
  bodyText: '#756A62',
  secondaryText: primitives.gray500,
  accent: primitives.pink600,
  accentHover: '#B14F65',
  softAccent: '#F1E7E3',
  inputBackground: '#FCFAF8',
  inputBorder: '#DDD2CA',
  placeholder: '#B1A59C',
  success: '#8D9B7A',
  warning: '#C4875A',
  danger: '#B85C5C',
  white: primitives.white,
  overlay: 'rgba(30, 23, 20, 0.4)',
  muted: primitives.gray500,
  primary: primitives.pink600,
};

export default colors;
