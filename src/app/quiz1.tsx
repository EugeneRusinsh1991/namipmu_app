// GENERATED FILE: this route is recreated by scripts/generateContent.js
import ContentPage from '../components/ContentPage';
import type { ContentBlock } from '../content/types';
import { quiz1Content } from '../content/lessons/quiz1Content';

export default function Quiz1() {
  return <ContentPage title="Quiz1" contentModule={quiz1Content as ContentBlock[]} />;
}
