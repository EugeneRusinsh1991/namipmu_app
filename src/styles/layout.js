import { StyleSheet } from 'react-native';
import { colors, layout as layoutTokens } from './theme';

export const layoutStyles = StyleSheet.create({
  appBackground: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },

  container: {
    flex: 1,
    padding: layoutTokens.containerPadding,
    maxWidth: layoutTokens.maxWidth,
    alignSelf: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
});
