/**
 * Visual Foundation - Modular Architecture
 *
 * Точка сборки для всех геометрических токенов дизайн-системы:
 * - Borders (радиусы, толщина)
 * - Spacing (отступы)
 * - Sizing (размеры компонентов)
 * - Layout (макет, контейнеры)
 * - Visuals (параметры визуальных элементов - карточки, видео, герои)
 * - ComponentSpacing (специфичные отступы для компонентов)
 * - Typography (семантические роли типографики)
 * - Effects (тени и эффекты)
 *
 * Все модули хранятся в /tokens/ для лучшей масштабируемости.
 * Foundation служит единой точкой входа и обеспечивает обратную совместимость.
 */

// ===== IMPORTS FROM TOKEN MODULES =====

import type { ColorTokens } from './tokens/colors';

import type {
  SemanticTypographyRole,
  TypographyTokens,
} from './tokens/typography';
import {
  BODY_ROLE,
  HEADING_ROLE,
  SUBHEADING_ROLE,
} from './tokens/typography';

import type {
  BorderTokens,
  ComponentSpacingTokens,
  GeometryTokens,
  LayoutTokens,
  SizingTokens,
  SpacingTokens,
  VisualCardSize,
  VisualTokens,
} from './tokens/geometry';
import { createGeometryTokens } from './tokens/geometry';

import type {
  EffectsTokens,
  ShadowGeometry,
  ShadowTokensGeometry,
} from './tokens/effects';
import { createEffectsTokens } from './tokens/effects';

// ===== RE-EXPORTS FOR BACKWARD COMPATIBILITY =====

// Color interfaces
export type { ColorTokens };

// Typography interfaces and constants
  export { BODY_ROLE, HEADING_ROLE, SUBHEADING_ROLE };
  export type { SemanticTypographyRole, TypographyTokens };

// Geometry interfaces
  export type {
    BorderTokens,
    ComponentSpacingTokens,
    GeometryTokens,
    LayoutTokens,
    SizingTokens,
    SpacingTokens,
    VisualCardSize,
    VisualTokens
  };

// Effects interfaces
  export type {
    EffectsTokens,
    ShadowGeometry,
    ShadowTokensGeometry
  };

// ===== COMBINED FOUNDATION INTERFACE =====

/**
 * VisualFoundation: Aggregated interface combining all token types
 * 
 * This interface extends all token modules to create a unified
 * definition of the design system tokens. It maintains backward
 * compatibility with existing code that imports from foundation.ts.
 */
export interface VisualFoundation
  extends GeometryTokens,
    TypographyTokens,
    EffectsTokens {
  // These are already included via extends from GeometryTokens, TypographyTokens, EffectsTokens
  // No additional fields needed
}

// ===== FOUNDATION OBJECT (SINGLE ENTRY POINT) =====

/**
 * Foundation object: The unified entry point for all design tokens
 * 
 * This object aggregates tokens from all modules into a single,
 * cohesive interface that components and utilities can use.
 */
export const foundation: VisualFoundation = {
  // Geometry tokens
  ...createGeometryTokens(),

  // Typography tokens
  header: HEADING_ROLE,
  subheading: SUBHEADING_ROLE,
  text: BODY_ROLE,

  // Effects tokens
  ...createEffectsTokens(),
};

export default foundation;
