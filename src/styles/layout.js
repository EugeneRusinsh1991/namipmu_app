import { StyleSheet } from 'react-native';

/**
 * @typedef {import('./design-system/theme').SemanticTokens} SemanticTokens
 */

/**
 * @param {SemanticTokens} tokens
 */
export function getLayoutStyles(tokens) {
  return StyleSheet.create({
    appBackground: {
      flex: 1,
      // backgroundColor будет установлен динамически через контекст темы
    },

    container: {
      flex: 1,
      padding: tokens.spacing.lg,
      maxWidth: tokens.layout.contentMaxWidth,
      alignSelf: 'center',
      width: '100%',
      position: 'relative',
      zIndex: 1, // TODO: Вынести в токены zIndex при их появлении рядом с этим свойством.
    },

    containerCompact: {
      flex: 1,
      padding: tokens.spacing.md,
      maxWidth: tokens.layout.contentMaxWidth,
      alignSelf: 'center',
      width: '100%',
    },

    spacer: {
      marginVertical: tokens.spacing.md,
    },

    spacerHorizontal: {
      marginHorizontal: tokens.spacing.md,
    },
  });
}
