import { ComponentType, FC } from 'react';
import { CardBlock } from './CardBlock';
import { ChecklistBlock } from './ChecklistBlock';
import { HeroBlock } from './HeroBlock';
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

/**
 * Интерфейс для пропс, которые получают блок компоненты
 */
export interface BlockProps {
  item: any;
  lang?: string;
  setLang?: (lang: string) => void;
  heroOverlapStyle?: any;
  [key: string]: any;
}

/**
 * Тип для компонента блока
 */
export type BlockComponent = ComponentType<BlockProps>;

/**
 * Реестр всех доступных блок компонентов
 * Отображает тип контента на соответствующий React компонент
 */
export const blockRegistry: Record<string, BlockComponent> = {
  title: TitleBlock as unknown as FC<BlockProps>,
  eyebrow: EyebrowBlock as unknown as FC<BlockProps>,
  subtitle: SubtitleBlock as unknown as FC<BlockProps>,
  text: TextContentBlock as unknown as FC<BlockProps>,
  languageSwitcher: LanguageSwitcherBlock as unknown as FC<BlockProps>,
  navigationButtons: NavigationBlock as unknown as FC<BlockProps>,
  list: ListBlock as unknown as FC<BlockProps>,
  image: ImageBlock as unknown as FC<BlockProps>,
  gif: GifBlock as unknown as FC<BlockProps>,
  video: VideoBlock as unknown as FC<BlockProps>,
  timer: TimerBlock as unknown as FC<BlockProps>,
  link: LinkBlock as unknown as FC<BlockProps>,
  quiz: QuizBlock as unknown as FC<BlockProps>,
  checklist: ChecklistBlock as unknown as FC<BlockProps>,
  spacer: SpacerDivider as unknown as FC<BlockProps>,
  spacerDivider: SpacerDivider as unknown as FC<BlockProps>,
  card: CardBlock as unknown as FC<BlockProps>,
  cardBig: CardBlock as unknown as FC<BlockProps>,
  cardSmall: CardBlock as unknown as FC<BlockProps>,
  heroImage: HeroBlock as unknown as FC<BlockProps>,
};
