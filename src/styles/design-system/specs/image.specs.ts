import type { VisualFoundation } from '../foundation';
import type { SemanticTokens } from '../theme';

export interface ImageSpecs {
  hero: {
    height: number;
    marginBottom: number;
  };
  card: {
    height: number;
    borderRadius: number;
  };
  square: {
    width: number;
    height: number;
  };
  video: {
    height: number;
    borderRadius: number;
  };
}

export function getImageSpecs(tokens: SemanticTokens & VisualFoundation): ImageSpecs {
  return {
    hero: {
      height: 200,
      marginBottom: -30,
    },
    card: {
      height: 150,
      borderRadius: tokens.borders.radiusMd,
    },
    square: {
      width: 300,
      height: 300,
    },
    video: {
      height: 220,
      borderRadius: tokens.borders.radiusMd,
    },
  };
}
