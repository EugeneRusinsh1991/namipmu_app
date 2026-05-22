// GENERATED FILE: this route is recreated by scripts/generateContent.js
import ContentPage from '../components/ContentPage';
import type { ContentBlock } from '../content/types';
import { equipmentContent } from '../content/lessons/equipmentContent';

export default function Equipment() {
  return <ContentPage title="Equipment" contentModule={equipmentContent as ContentBlock[]} />;
}
