import { Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import type { ContentBlock } from '../content/types';
import { useLanguage } from '../context/LanguageContext';
import { globalStyles } from '../styles/globalStyles';
import { HeroBlock } from './blocks';
import ContentRenderer from './ContentRenderer';
import PageLanguageButton from './HeaderLanguageSwitcher';
import ProgressBar from './ProgressBar';

interface ContentPageProps {
  title: string;
  contentModule: ContentBlock[];
}

export default function ContentPage({ title, contentModule }: ContentPageProps) {
  const { lang } = useLanguage();
  const [progress, setProgress] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrolled = contentOffset.y;
    const contentHeight = contentSize.height - layoutMeasurement.height;
    
    if (contentHeight > 0) {
      const progressPercent = (scrolled / contentHeight) * 100;
      setProgress(progressPercent);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title }} />
      
      <ProgressBar progress={progress} />
      
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
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
