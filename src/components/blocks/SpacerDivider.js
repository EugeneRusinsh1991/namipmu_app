import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';
import { getLocalized } from '../../utils/i18n';

export function SpacerDivider({ item, lang, heroOverlapStyle }) {
  const title = getLocalized(item.title, lang, '');
  const hasTitle = Boolean(title && String(title).trim());

  return (
    <View style={[styles.wrapper, heroOverlapStyle]}>
      {hasTitle ? (
        <>
          <View style={styles.line} />
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <View style={styles.line} />
        </>
      ) : (
        <View style={styles.lineFull} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: spacing.sm,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  lineFull: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  text: {
    marginHorizontal: spacing.sm,
    color: colors.textPrimary,
    fontSize: typography.fontSizeMd,
    textAlign: 'center',
    flexShrink: 1,
    minWidth: 0,
  },
});
