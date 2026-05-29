/**
 * Geometry Tokens Module
 * 
 * Все геометрические параметры дизайн-системы:
 * отступы, размеры, радиусы, макет, визуальные параметры контента.
 */

/**
 * Border tokens interface
 */
export interface BorderTokens {
  radiusStandard: number;
  radiusFull: number;
  widthStandard: number;
  /** optional theme-provided default border color (populated at merge time) */
  colorDefault?: string;
}

/**
 * Spacing tokens interface
 */
export interface SpacingTokens {
  standard: number;
}

/**
 * Sizing tokens interface
 * Heights and padding for components
 */
export interface SizingTokens {
  buttonHeight: number;
  buttonPaddingHorizontal: number;
  buttonPaddingVertical: number;
  inputHeight: number;
  inputPaddingHorizontal: number;
  inputPaddingVertical: number;
  checkboxSize: number;
}

/**
 * Visual card size interface
 */
export interface VisualCardSize {
  imageHeight: number;
  contentHeight: number;
}

/**
 * Visual tokens interface
 * Content-specific geometry used by generators and components
 */
export interface VisualTokens {
  hero: {
    height: number;
    marginBottom: number;
    webHeight: number;
    webMarginBottom: number;
    webGradientHeight: number;
    defaultGradientHeight: number;
  };
  card: {
    large: VisualCardSize;
    small: VisualCardSize;
    borderRadius: number;
  };
  square: {
    width: number;
    height: number;
    marginBottom: number;
  };
  video: {
    height: number;
    borderRadius: number;
  };
}

/**
 * Component-specific spacing tokens
 */
export interface ComponentSpacingTokens {
  quiz: {
    container: number;
    answerPadding: number;
    answerMarginVertical: number;
  };
  checklist: {
    itemPadding: number;
    itemMarginBottom: number;
  };
  timer: {
    containerPadding: number;
  };
}

/**
 * Layout tokens interface
 */
export interface LayoutTokens {
  contentMaxWidth: number;
}

/**
 * Aggregated geometry tokens interface
 */
export interface GeometryTokens {
  borders: BorderTokens;
  spacing: SpacingTokens;
  layout: LayoutTokens;
  sizing: SizingTokens;
  visuals: VisualTokens;
  componentSpacing: ComponentSpacingTokens;
}

/**
 * Create geometry tokens with default values
 */
export const createGeometryTokens = (): GeometryTokens => ({
  borders: {
    radiusStandard: 12,
    radiusFull: 999,
    widthStandard: 0,
  },

  sizing: {
    buttonHeight: 52,
    buttonPaddingHorizontal: 24,
    buttonPaddingVertical: 14,
    inputHeight: 48,
    inputPaddingHorizontal: 16,
    inputPaddingVertical: 8,
    checkboxSize: 24,
  },

  visuals: {
    hero: {
      height: 200,
      marginBottom: -30,
      webHeight: 250,
      webMarginBottom: -40,
      webGradientHeight: 120,
      defaultGradientHeight: 80,
    },
    card: {
      large: {
        imageHeight: 150,
        contentHeight: 110,
      },
      small: {
        imageHeight: 110,
        contentHeight: 70,
      },
      borderRadius: 12,
    },
    square: {
      width: 300,
      height: 300,
      marginBottom: 20,
    },
    video: {
      height: 220,
      borderRadius: 12,
    },
  },

  componentSpacing: {
    quiz: {
      container: 24,
      answerPadding: 16,
      answerMarginVertical: 8,
    },
    checklist: {
      itemPadding: 16,
      itemMarginBottom: 16,
    },
    timer: {
      containerPadding: 24,
    },
  },

  spacing: {
    standard: 12,
  },

  layout: {
    contentMaxWidth: 600,
  },
});

export default {
  createGeometryTokens,
};
