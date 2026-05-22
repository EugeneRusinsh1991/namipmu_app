import { CardBlock } from './CardBlock';
import { GifBlock, ImageBlock } from './ImageBlock';
import { LanguageSwitcherBlock } from './LanguageSwitcherBlock';
import { LinkBlock } from './LinkBlock';
import { ListBlock } from './ListBlock';
import { NavigationBlock } from './NavigationBlock';
import { SpacerDivider } from './SpacerDivider';
import { EyebrowBlock, SubtitleBlock, TextContentBlock, TitleBlock } from './TextBlock';
import { VideoBlock } from './VideoBlock';

export const blockRegistry = {
  title: TitleBlock,
  eyebrow: EyebrowBlock,
  subtitle: SubtitleBlock,
  text: TextContentBlock,
  languageSwitcher: LanguageSwitcherBlock,
  navigationButtons: NavigationBlock,
  list: ListBlock,
  image: ImageBlock,
  gif: GifBlock,
  video: VideoBlock,
  link: LinkBlock,
  spacerDivider: SpacerDivider,
  card: CardBlock,
  cardBig: CardBlock,
  cardSmall: CardBlock,
};

