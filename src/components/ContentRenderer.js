import { useLanguage } from '../context/LanguageContext';
import { spacing } from '../styles/theme';
import { blockRegistry } from './blocks/registry';
import CardGrid from './CardGrid';

export default function ContentRenderer({ content, lang = 'ru' }) {
  const { setLang } = useLanguage();
  const filteredContent = content.filter(item => item.type !== 'heroImage');
  const hadHeroImage = content.some(item => item.type === 'heroImage');

  const renderBlock = (item, index, heroOverlapStyle) => {
    const BlockComponent = blockRegistry[item.type];

    if (!BlockComponent) {
      return null;
    }

    return (
      <BlockComponent
        key={index}
        item={item}
        lang={lang}
        setLang={setLang}
        heroOverlapStyle={heroOverlapStyle}
      />
    );
  };

  const rendered = [];
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
          <CardGrid key={`card-group-${i}`} items={group} lang={lang} gap={spacing.md} heroOverlapStyle={heroOverlapStyle} />
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
}

