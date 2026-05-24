import { Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import type { ContentBlock } from '../content/types';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
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
  const { colors, componentStyles } = useTheme();
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

  const containerStyle = StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      maxWidth: 600,
      marginHorizontal: 'auto',
    },
  });

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
          <View style={[styles.headerControls, { backgroundColor: colors.white, borderRadius: componentStyles?.card?.borderRadius, borderColor: colors.border }]}>
            <PageLanguageButton />
            <HeaderTextSizeControls />
          </View>
        </View>
        
        {/* Content below */}
        <View style={containerStyle.container}>
          <ContentRenderer content={contentModule} lang={lang} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerControls: {
    position: 'absolute',
    top: 30,
    right: 24,
    zIndex: 200,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    // backgroundColor, borderRadius and borderColor applied dynamically via useTheme()
    borderWidth: 1,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
});
