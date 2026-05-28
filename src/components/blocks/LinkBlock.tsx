import { useDesignTokens } from '@/hooks/useDesignTokens';
import { Link } from 'expo-router';
import React, { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';
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

  const { tokens } = useDesignTokens();
  const text = getLocalized(item.text, lang, '');
  const normalizedHref = typeof item.href === 'string' 
    ? (item.href.startsWith('/') ? item.href : `/${item.href}`)
    : item.href;
  const flattenedHeroStyle = StyleSheet.flatten(heroOverlapStyle);

  const styles = useMemo(() => ({
    linkText: {
      color: tokens.interactive.accent,
    },
  }), [tokens]);

  return (
    <Link href={normalizedHref as any} style={flattenedHeroStyle}>
      <ScaledText style={[styles.linkText, flattenedHeroStyle]}>
        {text}
      </ScaledText>
    </Link>
  );
};
