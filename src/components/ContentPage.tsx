import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { globalStyles } from '../styles/globalStyles';
import ContentRenderer, { HeroImageRenderer } from './ContentRenderer';

interface ContentPageProps {
  title: string;
  contentModule: any;
}

export default function ContentPage({ title, contentModule }: ContentPageProps) {
  const { lang } = useLanguage();

  return (
    <>
      <Stack.Screen options={{ title }} />
      
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <HeroImageRenderer content={contentModule} lang={lang} />
        <View style={globalStyles.container}>
          <ContentRenderer content={contentModule} lang={lang} />
        </View>
      </ScrollView>
    </>
  );
}
