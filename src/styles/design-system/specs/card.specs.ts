import type { VisualFoundation } from '../foundation';
import type { SemanticTokens } from '../theme';

export interface CardSpecs {
  large: {
    borderRadius: number;
    padding: number;
    shadowElevation: number;
    backgroundColor: string;
    borderColor: string;
    imageSizeConfig: {
      height: number;
      contentHeight: number;
    };
  };
  small: {
    borderRadius: number;
    padding: number;
    shadowElevation: number;
    backgroundColor: string;
    borderColor: string;
    imageSizeConfig: {
      height: number;
      contentHeight: number;
    };
  };
}

export function getCardSpecs(tokens: SemanticTokens & VisualFoundation): CardSpecs {
  return {
    large: {
      borderRadius: tokens.borders.radiusMd,
      padding: tokens.spacing.lg,
      backgroundColor: tokens.surface.surfaceSecondary,
      borderColor: tokens.interactive.border,
      shadowElevation: tokens.shadows.md.elevation,
      imageSizeConfig: {
        height: 150,
        contentHeight: 110,
      },
    },
    small: {
      borderRadius: tokens.borders.radiusMd,
      padding: tokens.spacing.md,
      backgroundColor: tokens.surface.surfaceSecondary,
      borderColor: tokens.interactive.border,
      shadowElevation: tokens.shadows.sm.elevation,
      imageSizeConfig: {
        height: 110,
        contentHeight: 70,
      },
    },
  };
}
