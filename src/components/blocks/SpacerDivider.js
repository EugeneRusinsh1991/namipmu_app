import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { spacing } from '../../styles/theme';
import { getLocalized } from '../../utils/i18n';

export function SpacerDivider({ item, lang, heroOverlapStyle }) {
  const title = getLocalized(item.title, lang, '');
  const hasTitle = Boolean(title && String(title).trim());
  const { colors } = useTheme();

  return (
    <View style={[styles.wrapper, heroOverlapStyle]}>
      {hasTitle ? (
        <>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
          <Text style={[styles.text, globalStyles.spacer, { color: colors.textPrimary }]} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
        </>
      ) : (
        <View style={[styles.lineFull, { backgroundColor: colors.border }]} />
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
    backgroundColor: '#d8d0c7',
  },
  lineFull: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#d8d0c7',
  },
  text: {
    marginHorizontal: spacing.sm,
    color: '#2b2520',
    textAlign: 'center',
    flexShrink: 1,
    minWidth: 0,
  },
});
