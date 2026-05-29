import type { VisualFoundation } from '../foundation';
import type { SemanticTokens } from '../theme';

export interface CardSpecs {
  large: {
    borderRadius: number;
    padding: number;
    shadowElevation: number;
    shadow: VisualFoundation['shadows']['standard'];
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
    shadow: VisualFoundation['shadows']['standard'];
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
      borderRadius: tokens.borders.radiusStandard,
      padding: tokens.spacing.standard,
      backgroundColor: tokens.surface.surfaceSecondary,
      borderColor: tokens.interactive.border,
      shadowElevation: tokens.shadows.standard.elevation,
      shadow: tokens.shadows.standard,
      imageSizeConfig: {
        height: tokens.visuals.card.large.imageHeight,
        contentHeight: tokens.visuals.card.large.contentHeight,
      },
    },
    small: {
      borderRadius: tokens.borders.radiusStandard,
      padding: tokens.spacing.standard,
      backgroundColor: tokens.surface.surfaceSecondary,
      borderColor: tokens.interactive.border,
      shadowElevation: tokens.shadows.standard.elevation,
      shadow: tokens.shadows.standard,
      imageSizeConfig: {
        height: tokens.visuals.card.small.imageHeight,
        contentHeight: tokens.visuals.card.small.contentHeight,
      },
    },
  };
}
