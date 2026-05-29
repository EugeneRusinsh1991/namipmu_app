import type { ViewStyle } from 'react-native';
import type { VisualFoundation } from './design-system/foundation';
import type { SemanticTokens } from './design-system/theme/types';

export interface LayoutStyles {
  container: ViewStyle;
}

export function getLayoutStyles(tokens: SemanticTokens & VisualFoundation): LayoutStyles {
  return {
    container: {
      flex: 1,
      width: '100%',
      maxWidth: tokens.layout.contentMaxWidth,
      paddingHorizontal: tokens.spacing.standard,
      alignSelf: 'center',
    },
  };
}
