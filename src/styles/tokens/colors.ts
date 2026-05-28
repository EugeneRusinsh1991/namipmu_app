// Palette primitives and semantic roles

/**
 * @deprecated Use palette from `src/styles/design-system/palette.ts` instead.
 * These are legacy primitive colors for backwards compatibility.
 */
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

/**
 * @deprecated Use semantic tokens from `src/styles/design-system/theme.ts` instead.
 * This is a legacy light color palette for backwards compatibility.
 */
export const lightColors = {
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

/**
 * @deprecated Use semantic tokens from `src/styles/design-system/theme.ts` instead.
 * This is a legacy dark color palette for backwards compatibility.
 */
export const darkColors = {
  ...primitives,
  backgroundLight: '#5a7591', // Мягкий темно-серый (Slate 900)
  secondarySurface: '#2D2F31', // Поверхности второго уровня
  cardBackground: '#2D2F31', // Карточки заметно светлее фона
  border: '#3F4143', // Границы видны, но не режут глаз
  textPrimary: '#E3E2E6', // Светло-серый (почти белый) для заголовков
  bodyText: '#C7C6CA', // Мягкий текст, который не "слепит" в темноте
  secondaryText: '#919194', // Вспомогательный текст
  accent: primitives.pink600,
  accentHover: '#B14F65',
  softAccent: '#352329', // Темный приглушенный розовый
  inputBackground: '#161B22',
  inputBorder: '#30363D',
  placeholder: '#484F58',
  success: '#8D9B7A',
  warning: '#C4875A',
  danger: '#B85C5C',
  white: '#E3E2E6', // Теперь текст "eyebrow" будет виден!
  overlay: 'rgba(0, 0, 0, 0.8)',
  muted: '#919194',
  primary: primitives.pink600,
};

/**
 * @deprecated Use semantic tokens from `src/styles/design-system/theme.ts` instead.
 * This is a legacy default export for backwards compatibility. Defaults to lightColors.
 */
export default lightColors;
