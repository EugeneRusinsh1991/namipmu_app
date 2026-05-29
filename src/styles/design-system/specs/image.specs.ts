import type { VisualFoundation } from '../foundation';
import type { SemanticTokens } from '../theme';

export interface ImageSpecs {
  hero: {
    height: number;
    marginBottom: number;
    shadow: VisualFoundation['shadows']['standard'];
  };
  card: {
    height: number;
    borderRadius: number;
    shadow: VisualFoundation['shadows']['standard'];
  };
  square: {
    width: number;
    height: number;
    shadow: VisualFoundation['shadows']['standard'];
  };
  video: {
    height: number;
    borderRadius: number;
    shadow: VisualFoundation['shadows']['standard'];
  };
}

export function getImageSpecs(tokens: SemanticTokens & VisualFoundation): ImageSpecs {
  return {
    hero: {
      height: tokens.visuals.hero.height,
      marginBottom: tokens.visuals.hero.marginBottom,
      shadow: tokens.shadows.standard,
    },
    card: {
      height:  tokens.visuals.card.large.imageHeight,
      borderRadius: tokens.borders.radiusStandard,
      shadow: tokens.shadows.standard,
    },
    square: {
      width: tokens.visuals.square.width,
      height: tokens.visuals.square.height,
      shadow: tokens.shadows.standard,
    },
    video: {
      height: tokens.visuals.video.height,
      borderRadius: tokens.borders.radiusStandard,
      shadow: tokens.shadows.standard,
    },
  };
}
