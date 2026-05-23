import { StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export const listStyles = StyleSheet.create({
  listContainer: {
    marginTop: 0,
    marginBottom: 12,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingLeft: 16,
    backgroundColor: colors.secondarySurface,
    borderRadius: radius.md,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  listItem: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-start',
  },

  listBullet: {
    fontSize: 22,
    marginRight: 8,
    color: colors.accent,
    fontWeight: '600',
    fontFamily: 'sans-serif',
  },

  listItemText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.bodyText,
    flex: 1,
    fontFamily: 'sans-serif',
  },
});
