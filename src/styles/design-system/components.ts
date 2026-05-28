import type { ButtonSpecs } from './specs/button.specs';
import { getButtonSpecs } from './specs/button.specs';
import type { CardSpecs } from './specs/card.specs';
import { getCardSpecs } from './specs/card.specs';
import type { ChecklistSpecs } from './specs/checklist.specs';
import { getChecklistSpecs } from './specs/checklist.specs';
import type { ImageSpecs } from './specs/image.specs';
import { getImageSpecs } from './specs/image.specs';
import type { InputSpecs } from './specs/input.specs';
import { getInputSpecs } from './specs/input.specs';
import type { QuizSpecs } from './specs/quiz.specs';
import { getQuizSpecs } from './specs/quiz.specs';
import type { TimerSpecs } from './specs/timer.specs';
import { getTimerSpecs } from './specs/timer.specs';
import type { SemanticTokens } from './theme';

export type { ButtonSpecs } from './specs/button.specs';
export type { CardSpecs } from './specs/card.specs';
export type { ChecklistSpecs } from './specs/checklist.specs';
export type { ImageSpecs } from './specs/image.specs';
export type { InputSpecs } from './specs/input.specs';
export type { QuizSpecs } from './specs/quiz.specs';
export type { TimerSpecs } from './specs/timer.specs';

export interface ComponentSpecifications {
  button: ButtonSpecs;
  card: CardSpecs;
  input: InputSpecs;
  quiz: QuizSpecs;
  checklist: ChecklistSpecs;
  timer: TimerSpecs;
  image: ImageSpecs;
}

export function getComponentSpecs(tokens: SemanticTokens): ComponentSpecifications {
  return {
    button: getButtonSpecs(tokens),
    card: getCardSpecs(tokens),
    input: getInputSpecs(tokens),
    quiz: getQuizSpecs(tokens),
    checklist: getChecklistSpecs(tokens),
    timer: getTimerSpecs(tokens),
    image: getImageSpecs(tokens),
  };
}

export default { getComponentSpecs };
