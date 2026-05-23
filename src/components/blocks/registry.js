import { CardBlock } from './CardBlock';
import { ChecklistBlock } from './ChecklistBlock';
import { GifBlock, ImageBlock } from './ImageBlock';
import { LanguageSwitcherBlock } from './LanguageSwitcherBlock';
import { LinkBlock } from './LinkBlock';
import { ListBlock } from './ListBlock';
import { NavigationBlock } from './NavigationBlock';
import { QuizBlock } from './QuizBlock';
import { SpacerDivider } from './SpacerDivider';
import { EyebrowBlock, SubtitleBlock, TextContentBlock, TitleBlock } from './TextBlock';
import { TimerBlock } from './TimerBlock';
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
  timer: TimerBlock,
  link: LinkBlock,
  quiz: QuizBlock,
  checklist: ChecklistBlock,
  spacerDivider: SpacerDivider,
  card: CardBlock,
  cardBig: CardBlock,
  cardSmall: CardBlock,
};

