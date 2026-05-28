import type { VisualFoundation } from './foundation';
import foundation from './foundation';
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

export function getComponentSpecs(tokens: SemanticTokens & VisualFoundation): ComponentSpecifications {
  const merged = { ...foundation, ...tokens } as SemanticTokens & VisualFoundation;
  return {
    button: getButtonSpecs(merged),
    card: getCardSpecs(merged),
    input: getInputSpecs(merged),
    quiz: getQuizSpecs(merged),
    checklist: getChecklistSpecs(merged),
    timer: getTimerSpecs(merged),
    image: getImageSpecs(merged),
  };
}

export default { getComponentSpecs };
