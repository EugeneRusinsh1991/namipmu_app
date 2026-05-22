import { useLanguage } from '../context/LanguageContext';
import { spacing } from '../styles/theme';
import {
  CardBlock,
  EyebrowBlock,
  GifBlock,
  ImageBlock,
  LanguageSwitcherBlock,
  LinkBlock,
  ListBlock,
  NavigationBlock,
  SubtitleBlock,
  TextContentBlock,
  TitleBlock,
  VideoBlock,
} from './blocks';

export default function ContentRenderer({ content, lang = 'ru' }) {
  const { setLang } = useLanguage();
  
  // Фильтруем контент - исключаем heroImage
  const filteredContent = content.filter(item => item.type !== 'heroImage');
  let hadHeroImage = content.some(item => item.type === 'heroImage');

  // Компонент для отрисовки конкретного блока контента
  const renderBlock = (item, index, heroOverlapStyle) => {
    switch (item.type) {
      case 'title':
        return <TitleBlock key={index} item={item} lang={lang} heroOverlapStyle={heroOverlapStyle} />;
      case 'eyebrow':
        return <EyebrowBlock key={index} item={item} lang={lang} heroOverlapStyle={heroOverlapStyle} />;
      case 'subtitle':
        return <SubtitleBlock key={index} item={item} lang={lang} heroOverlapStyle={heroOverlapStyle} />;
      case 'text':
        return <TextContentBlock key={index} item={item} lang={lang} heroOverlapStyle={heroOverlapStyle} />;
      case 'languageSwitcher':
        return <LanguageSwitcherBlock key={index} item={item} lang={lang} setLang={setLang} heroOverlapStyle={heroOverlapStyle} />;
      case 'navigationButtons':
        return <NavigationBlock key={index} item={item} lang={lang} heroOverlapStyle={heroOverlapStyle} />;
      case 'list':
        return <ListBlock key={index} item={item} lang={lang} heroOverlapStyle={heroOverlapStyle} />;
      case 'image':
        return <ImageBlock key={index} item={item} lang={lang} heroOverlapStyle={heroOverlapStyle} />;
      case 'gif':
        return <GifBlock key={index} item={item} lang={lang} heroOverlapStyle={heroOverlapStyle} />;
      case 'video':
        return <VideoBlock key={index} item={item} lang={lang} heroOverlapStyle={heroOverlapStyle} />;
      case 'link':
        return <LinkBlock key={index} item={item} lang={lang} heroOverlapStyle={heroOverlapStyle} />;
      case 'card':
      case 'cardBig':
      case 'cardSmall':
        return <CardBlock key={index} item={item} lang={lang} heroOverlapStyle={heroOverlapStyle} />;
      default:
        return null;
    }
  };

  return (
    <>
      {filteredContent.map((item, index) => {
        // Если это первый элемент и была heroImage, применяем наложение
        const isFirstAfterHero = index === 0 && hadHeroImage;
        const heroOverlapStyle = isFirstAfterHero ? { marginTop: -spacing.xxl } : {};

        return renderBlock(item, index, heroOverlapStyle);
      })}
    </>
  );
}

