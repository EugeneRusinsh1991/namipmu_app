import { globalStyles } from '@/styles/globalStyles';
import { Stack } from 'expo-router';
import {
    ScrollView,
    View
} from 'react-native';
import ContentRenderer, { HeroImageRenderer } from '../components/ContentRenderer';
import { indexContent } from '../content/lessons/indexContent';
import { useLanguage } from '../context/LanguageContext';

export default function Index() {
  const { lang } = useLanguage();
  const content = indexContent;

  return (
    <>
      <Stack.Screen options={{ title: 'НАЧАЛО' }} />
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <HeroImageRenderer content={content} lang={lang} />
        <View style={globalStyles.container}>
          <ContentRenderer content={content} lang={lang} />
        </View>
      </ScrollView>
    </>
  );
}