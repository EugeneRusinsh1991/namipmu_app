/**
 * Effects Tokens Module
 * 
 * Теневые эффекты и другие визуальные эффекты.
 * Геометрия теней (без цвета - цвет управляется темой).
 */

/**
 * Shadow geometry interface
 * Defines the geometric properties of a shadow
 */
export interface ShadowGeometry {
  elevation: number;
  /** color is provided by theme; kept optional here for merged tokens */
  shadowColor?: string;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset: { width: number; height: number };
}

/**
 * Shadow tokens interface
 */
export interface ShadowTokensGeometry {
  standard: ShadowGeometry;
}

/**
 * Effects tokens interface
 * Aggregates all visual effects (shadows, blur, etc.)
 */
export interface EffectsTokens {
  shadows: ShadowTokensGeometry;
}

/**
 * Create effects tokens with default values
 */
export const createEffectsTokens = (): EffectsTokens => ({
  shadows: {
    standard: {
      elevation: 8,
      shadowOpacity: 1,
      shadowRadius: 12,
      shadowOffset: { width: 4, height: 4 },
    },
  },
});

export default {
  createEffectsTokens,
};
