import { Link } from 'expo-router';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { getLocalized } from '../../utils/i18n';
import ScaledText from '../ScaledText';

/**
 * Props для LinkBlock
 */
interface LinkBlockProps {
  item: {
    text: string | { [key: string]: string };
    href?: string;
    [key: string]: any;
  };
  lang: string;
  heroOverlapStyle?: any;
}

/**
 * Block компонент для ссылки
 */
export const LinkBlock: FC<LinkBlockProps> = ({ item, lang, heroOverlapStyle }) => {
  if (!item.href) return null;

  const { colors } = useTheme();
  const text = getLocalized(item.text, lang, '');
  const normalizedHref = typeof item.href === 'string' 
    ? (item.href.startsWith('/') ? item.href : `/${item.href}`) 
    : item.href;
  const flattenedHeroStyle = StyleSheet.flatten(heroOverlapStyle);

  return (
    <Link href={normalizedHref} style={flattenedHeroStyle}>
      <ScaledText style={[{ color: colors.accent }, flattenedHeroStyle]}>
        {text}
      </ScaledText>
    </Link>
  );
};
