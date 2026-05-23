import { Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import type { ContentBlock } from '../content/types';
import { useLanguage } from '../context/LanguageContext';
import { globalStyles } from '../styles/globalStyles';
import { HeroBlock } from './blocks/HeroBlock';
import ContentRenderer from './ContentRenderer';
import PageLanguageButton from './HeaderLanguageSwitcher';
import HeaderTextSizeControls from './HeaderTextSizeControls';
import ProgressBar from './ProgressBar';

interface ContentPageProps {
  title: string;
  contentModule: ContentBlock[];
}

export default function ContentPage({ title, contentModule }: ContentPageProps) {
  const { lang } = useLanguage();
  const [progress, setProgress] = useState(0);

  // Runtime check for undefined components
  if (!HeroBlock || !ContentRenderer || !ProgressBar || !HeaderTextSizeControls || !PageLanguageButton) {
    console.error('CRITICAL: One of the core components is undefined. Check your exports/imports.');
    console.log('HeroBlock:', !!HeroBlock, 'ContentRenderer:', !!ContentRenderer, 'ProgressBar:', !!ProgressBar);
    console.log('HeaderTextSizeControls:', !!HeaderTextSizeControls, 'PageLanguageButton:', !!PageLanguageButton);
  }

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
        {/* Hero section with fixed language and font controls */}
        <View style={{ position: 'relative' }}>
          <HeroBlock content={contentModule} lang={lang} />
          <HeaderTextSizeControls />
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
