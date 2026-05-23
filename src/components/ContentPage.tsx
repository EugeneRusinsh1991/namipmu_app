import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import type { ContentBlock } from '../content/types';
import { useLanguage } from '../context/LanguageContext';
import { globalStyles } from '../styles/globalStyles';
import { HeroBlock } from './blocks';
import ContentRenderer from './ContentRenderer';
import PageLanguageButton from './HeaderLanguageSwitcher';

interface ContentPageProps {
  title: string;
  contentModule: ContentBlock[];
}

export default function ContentPage({ title, contentModule }: ContentPageProps) {
  const { lang } = useLanguage();

  return (
    <>
      <Stack.Screen options={{ title }} />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}>
        {/* Hero section with fixed language button */}
        <View style={{ position: 'relative' }}>
          <HeroBlock content={contentModule} lang={lang} />
          <PageLanguageButton />
        </View>
        
        {/* Content below */}
        <View style={globalStyles.container}>
          <ContentRenderer content={contentModule} lang={lang} />
        </View>
      </ScrollView>
    </>
  );
}
