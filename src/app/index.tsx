import ContentPage from '../components/ContentPage';
import type { ContentBlock } from '../content/types';
import { indexContent } from '../content/lessons/indexContent';

export default function Index() {
  return <ContentPage title="НАЧАЛО" contentModule={indexContent as ContentBlock[]} />;
}
