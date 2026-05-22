import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from './theme';

export const languageStyles = StyleSheet.create({
  langWrap: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },

  langBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: 18,
    borderRadius: radius.round,
    borderWidth: 2,
    borderColor: colors.backgroundLight,
    backgroundColor: colors.backgroundLight,
  },

  navBtn: {
    flex: 1,
    alignItems: 'center',
  },

  langBtnActive: {
    backgroundColor: colors.cardBackground,
    borderColor: colors.cardBackground,
  },

  langText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 14,
  },

  langTextActive: {
    color: '#000',
  },
});
