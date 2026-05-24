import colors from './colors';
import spacing from './spacing';
import typography from './typography';

export const tokens = {
  colors,
  spacing,
  typography,
  // Provide a full set of radius tokens and keep s/m/l aliases for compatibility
  borderRadius: {
    // small/medium/large aliases
    s: 8,
    m: 12,
    l: 20,
    // commonly used names in codebase
    sm: 8,
    md: 12,
    lg: 20,
    xl: 24,
    round: 999,
    modal: 24,
  },
  shadows: {
    sm: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
  },
};

export default tokens;
