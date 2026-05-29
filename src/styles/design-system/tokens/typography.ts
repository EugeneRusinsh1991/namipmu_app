/**
 * Typography Tokens Module
 * 
 * Семантические роли типографики: заголовки, подзаголовки, основной текст.
 * Определяет базовые параметры (размер, вес, высота строки, семейство).
 */

import type { TextStyle } from 'react-native';

/**
 * Semantic typography role definition
 * Contains size, weight, line height, and font family
 */
export interface SemanticTypographyRole {
  fontSize: number;
  fontWeight: TextStyle['fontWeight'];
  lineHeight: number;
  fontFamily: string;
}

/**
 * Typography tokens interface
 * Aggregates all semantic roles
 */
export interface TypographyTokens {
  header: SemanticTypographyRole;
  subheading: SemanticTypographyRole;
  text: SemanticTypographyRole;
}

/**
 * Default typography roles
 * Used as baseline for all themes
 */
export const HEADING_ROLE: SemanticTypographyRole = {
  fontSize: 36,
  fontWeight: '700',
  lineHeight: 36 * 1.2,
  fontFamily: 'serif',
};

export const SUBHEADING_ROLE: SemanticTypographyRole = {
  fontSize: 20,
  fontWeight: '600',
  lineHeight: 20 * 1.2,
  fontFamily: 'serif',
};

export const BODY_ROLE: SemanticTypographyRole = {
  fontSize: 16,
  fontWeight: '100',
  lineHeight: 16 * 1.2,
  fontFamily: 'serif',
};

/**
 * Create typography tokens with semantic roles
 */
export const createTypographyTokens = (): TypographyTokens => ({
  header: HEADING_ROLE,
  subheading: SUBHEADING_ROLE,
  text: BODY_ROLE,
});

export default {
  HEADING_ROLE,
  SUBHEADING_ROLE,
  BODY_ROLE,
  createTypographyTokens,
};
