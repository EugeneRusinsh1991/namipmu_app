export type LanguageCode = 'ru' | 'ua' | 'eng' | 'ger';

export type LocalizedValue<T> = Partial<Record<LanguageCode, T>>;
export type LocalizedText = LocalizedValue<string>;
export type AssetValue = number | string | { uri: string };
export type LocalizedAsset = LocalizedValue<AssetValue>;

export type ContentBlockBase<TType extends string> = {
  type: TType;
};

export type TextContentBlock = ContentBlockBase<'eyebrow' | 'title' | 'subtitle' | 'text'> & {
  text: LocalizedText;
};

export type HeroImageBlock = ContentBlockBase<'heroImage'> & {
  image?: LocalizedAsset;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
};

export type MediaBlock = ContentBlockBase<'image' | 'gif'> & {
  src?: LocalizedAsset;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
};

export type CardBlock = ContentBlockBase<'card' | 'cardBig' | 'cardSmall'> & {
  image?: LocalizedAsset;
  title?: LocalizedText;
  description?: LocalizedText;
  href?: string;
  size?: 'big' | 'small';
};

export type ListBlock = ContentBlockBase<'list'> & {
  items: { text: LocalizedText }[];
};

export type LinkBlock = ContentBlockBase<'link'> & {
  text: LocalizedText;
  href?: string;
};

export type SpacerDividerBlock = ContentBlockBase<'spacerDivider'> & {
  title?: LocalizedText;
};

export type VideoBlock = ContentBlockBase<'video'> & {
  url?: string;
};

export type LanguageSwitcherBlock = ContentBlockBase<'languageSwitcher'>;

export type NavigationButtonsBlock = ContentBlockBase<'navigationButtons'> & {
  backText?: LocalizedText;
  backHref?: string;
  nextText?: LocalizedText;
  href?: string;
};

export type ContentBlock =
  | TextContentBlock
  | HeroImageBlock
  | MediaBlock
  | CardBlock
  | ListBlock
  | LinkBlock
  | SpacerDividerBlock
  | VideoBlock
  | LanguageSwitcherBlock
  | NavigationButtonsBlock;
