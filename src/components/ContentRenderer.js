import { useLanguage } from '../context/LanguageContext';
import { spacing } from '../styles/theme';
import { blockRegistry } from './blocks/registry';

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

  return (
    <>
      {filteredContent.map((item, index) => {
        const isFirstAfterHero = index === 0 && hadHeroImage;
        const heroOverlapStyle = isFirstAfterHero ? { marginTop: -spacing.xxl } : {};

        return renderBlock(item, index, heroOverlapStyle);
      })}
    </>
  );
}

