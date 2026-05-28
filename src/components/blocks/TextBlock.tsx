import React, { FC, useMemo } from 'react';
import { useDesignTokens } from '../../hooks/useDesignTokens';
import { getLocalized } from '../../utils/i18n';
import ScaledText from '../ScaledText';

/**
 * Элемент контента с текстом
 */
interface TextBlockItem {
  text: string | { [key: string]: string };
  [key: string]: any;
}

/**
 * Props для LocalizedTextBlock
 */
interface LocalizedTextBlockProps {
  item: TextBlockItem;
  lang: string;
  heroOverlapStyle?: any;
  style?: any;
}

/**
 * Базовый компонент для блоков с локализованным текстом
 */
const LocalizedTextBlock: FC<LocalizedTextBlockProps> = ({ 
  item, 
  lang, 
  heroOverlapStyle, 
  style 
}) => {
  const text = getLocalized(item.text, lang, '');

  return (
    <ScaledText style={[style, heroOverlapStyle]}>
      {text}
    </ScaledText>
  );
};

/**
 * Block компонент для заголовка
 */
export const TitleBlock: FC<LocalizedTextBlockProps> = (props) => {
  const { tokens } = useDesignTokens();
  const styles = useMemo(
    () => ({
      title: {
        fontSize: tokens.typography.fontSizeXl,
        color: tokens.text.primary,
        fontWeight: tokens.typography.fontWeightBold,
      },
    }),
    [tokens]
  );

  return <LocalizedTextBlock {...props} style={styles.title} />;
};

/**
 * Block компонент для eyebrow (надзаголовок)
 */
export const EyebrowBlock: FC<LocalizedTextBlockProps> = (props) => {
  const { tokens } = useDesignTokens();
  const styles = useMemo(
    () => ({
      eyebrow: {
        color: tokens.interactive.accent,
        fontWeight: tokens.typography.fontWeightBold,
        textTransform: 'uppercase' as const,
        fontSize: tokens.typography.fontSizeSm,
      },
    }),
    [tokens]
  );

  return <LocalizedTextBlock {...props} style={styles.eyebrow} />;
};

/**
 * Block компонент для подзаголовка
 */
export const SubtitleBlock: FC<LocalizedTextBlockProps> = (props) => {
  const { tokens } = useDesignTokens();
  const styles = useMemo(
    () => ({
      subtitle: {
        fontSize: tokens.typography.fontSizeLg,
        color: tokens.text.secondary,
      },
    }),
    [tokens]
  );

  return <LocalizedTextBlock {...props} style={styles.subtitle} />;
};

/**
 * Block компонент для основного текста контента
 */
export const TextContentBlock: FC<LocalizedTextBlockProps> = (props) => {
  const { tokens } = useDesignTokens();
  const styles = useMemo(
    () => ({
      text: {
        fontSize: tokens.typography.fontSizeMd,
        lineHeight: tokens.typography.lineHeightMd,
        color: tokens.text.primary,
      },
    }),
    [tokens]
  );

  return <LocalizedTextBlock {...props} style={styles.text} />;
};
