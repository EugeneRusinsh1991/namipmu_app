import React, { FC } from 'react';
import { useTheme } from '../../context/ThemeContext';
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
  const { typography } = useTheme();
  return <LocalizedTextBlock {...props} style={typography.title} />;
};

/**
 * Block компонент для eyebrow (надзаголовок)
 */
export const EyebrowBlock: FC<LocalizedTextBlockProps> = (props) => {
  const { typography } = useTheme();
  return <LocalizedTextBlock {...props} style={typography.eyebrow} />;
};

/**
 * Block компонент для подзаголовка
 */
export const SubtitleBlock: FC<LocalizedTextBlockProps> = (props) => {
  const { typography } = useTheme();
  return <LocalizedTextBlock {...props} style={typography.subtitle} />;
};

/**
 * Block компонент для основного текста контента
 */
export const TextContentBlock: FC<LocalizedTextBlockProps> = (props) => {
  const { typography } = useTheme();
  return <LocalizedTextBlock {...props} style={typography.text} />;
};
