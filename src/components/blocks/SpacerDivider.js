import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { getLocalized } from '../../utils/i18n';

export function SpacerDivider({ item, lang, heroOverlapStyle }) {
  const title = getLocalized(item.title, lang, '');
  const hasTitle = Boolean(title && String(title).trim());
  const { colors, typography } = useTheme();

  const dynamicStyles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 8,
    },
    line: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.borderDefault,
    },
    lineFull: {
      width: '100%',
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.borderDefault,
    },
    text: {
      marginHorizontal: 8,
      textAlign: 'center',
      flexShrink: 1,
      minWidth: 0,
    },
  });

  return (
    <View style={[dynamicStyles.wrapper, heroOverlapStyle]}>
      {hasTitle ? (
        <>
          <View style={dynamicStyles.line} />
          <Text style={[dynamicStyles.text, typography.spacer]} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <View style={dynamicStyles.line} />
        </>
      ) : (
        <View style={dynamicStyles.lineFull} />
      )}
    </View>
  );
}
