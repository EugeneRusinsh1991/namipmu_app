import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { spacing } from '../styles/theme';
import { blockRegistry } from './blocks/registry';
import CardGrid from './CardGrid';

// Type definitions
interface ContentItem {
  type: string;
  [key: string]: any;
}

interface ContentRendererProps {
  content: ContentItem[];
  lang?: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content, lang = 'ru' }) => {
  const { setLang } = useLanguage();
  const filteredContent = content.filter(item => item.type !== 'heroImage');
  const hadHeroImage = content.some(item => item.type === 'heroImage');

  const renderBlock = (item: ContentItem, index: number, heroOverlapStyle: any) => {
    const BlockComponent = blockRegistry[item.type as keyof typeof blockRegistry];

    if (!BlockComponent) {
      return null;
    }

    return React.createElement(BlockComponent, {
      key: index,
      item,
      lang,
      setLang,
      heroOverlapStyle,
    });
  };

  const rendered: React.ReactNode[] = [];
  for (let i = 0; i < filteredContent.length; i++) {
    const item = filteredContent[i];
    const isFirstAfterHero = i === 0 && hadHeroImage;
    const heroOverlapStyle = isFirstAfterHero ? { marginTop: -spacing.xxl } : {};

    // Group consecutive card-like items
    if (item && typeof item.type === 'string' && /^card/i.test(item.type)) {
      const group = [item];
      let j = i + 1;
      while (j < filteredContent.length && filteredContent[j] && /^card/i.test(filteredContent[j].type)) {
        group.push(filteredContent[j]);
        j += 1;
      }

      if (group.length > 1) {
        rendered.push(
          React.createElement(CardGrid, {
            key: `card-group-${i}`,
            items: group,
            lang,
            gap: spacing.md,
            heroOverlapStyle,
          })
        );
      } else {
        rendered.push(renderBlock(item, i, heroOverlapStyle));
      }

      i = j - 1; // advance outer loop
      continue;
    }

    rendered.push(renderBlock(item, i, heroOverlapStyle));
  }

  return <>{rendered}</>;
};

export default ContentRenderer;
