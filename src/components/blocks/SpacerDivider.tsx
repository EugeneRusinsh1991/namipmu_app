import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDesignTokens } from '../../hooks/useDesignTokens';
import { getLocalized } from '../../utils/i18n';

/**
 * Props для SpacerDivider
 */
interface SpacerDividerProps {
  item: {
    title?: string | { [key: string]: string };
    [key: string]: any;
  };
  lang: string;
  heroOverlapStyle?: any;
}

/**
 * Block компонент для разделителя/спейсера
 * Может отображать просто линию или линию с текстом
 */
export const SpacerDivider: FC<SpacerDividerProps> = ({ item, lang, heroOverlapStyle }) => {
  const title = getLocalized(item.title, lang, '');
  const hasTitle = Boolean(title && String(title).trim());
  const { tokens } = useDesignTokens();

  const dynamicStyles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingVertical: tokens.spacing.standard,
    },
    line: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: tokens.interactive.border,
    },
    lineFull: {
      width: '100%',
      height: StyleSheet.hairlineWidth,
      backgroundColor: tokens.interactive.border,
    },
    text: {
      ...tokens.typography.text,
      marginHorizontal: tokens.spacing.standard,
      textAlign: 'center' as const,
      flexShrink: 1,
      minWidth: 0,
      color: tokens.text.secondary,
      fontSize: Math.round(tokens.typography.text.fontSize * 0.85),
    },
  });

  return (
    <View style={[dynamicStyles.wrapper, heroOverlapStyle]}>
      {hasTitle ? (
        <>
          <View style={dynamicStyles.line} />
          <Text
            style={dynamicStyles.text}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <View style={dynamicStyles.line} />
        </>
      ) : (
        <View style={dynamicStyles.lineFull} />
      )}
    </View>
  );
};
