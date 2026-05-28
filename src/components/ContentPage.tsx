import { useDesignTokens } from '@/hooks/useDesignTokens';
import { getLayoutStyles } from '@/styles/layout';
import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import type { ContentBlock } from '../content/types';
import { useLanguage } from '../context/LanguageContext';
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
  const { tokens, specs } = useDesignTokens();
  const [progress, setProgress] = useState(0);
  const styles = useMemo(() => getLayoutStyles(tokens), [tokens]);

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
      const progressFraction = scrolled / contentHeight;
      setProgress(Math.max(0, Math.min(1, progressFraction)));
    }
  };

  const pageStyles = useMemo(
    () =>
      StyleSheet.create({
        headerControls: {
          position: 'absolute',
          top: tokens.spacing.xl,
          right: tokens.spacing.lg,
          zIndex: 200,
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          borderWidth: tokens.borders.widthBase,
          padding: tokens.spacing.sm,
          backgroundColor: tokens.surface.surfacePrimary,
          borderColor: tokens.interactive.border,
          borderRadius: specs.card.large.borderRadius,
          shadowColor: tokens.shadows.md.shadowColor,
          shadowOffset: tokens.shadows.md.shadowOffset,
          shadowOpacity: tokens.shadows.md.shadowOpacity,
          shadowRadius: tokens.shadows.md.shadowRadius,
          elevation: tokens.shadows.md.elevation,
        },
        scrollView: {
          flex: 1,
          backgroundColor: tokens.surface.background,
        },
        scrollContainer: {
          flexGrow: 1,
          paddingBottom: tokens.spacing.xxl,
        },
      }),
    [tokens, specs]
  );

  return (
    <>
      <Stack.Screen options={{ title }} />
      
      <ProgressBar progress={progress} />
      
      <ScrollView 
        style={pageStyles.scrollView}
        contentContainerStyle={pageStyles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Hero section with fixed language and font controls */}
        <View style={{ position: 'relative' }}>
          <HeroBlock content={contentModule} lang={lang} />
          <View style={pageStyles.headerControls}> 
            <PageLanguageButton />
            <HeaderTextSizeControls />
          </View>
        </View>
        
        {/* Content below */}
        <View style={styles.container}>
          <ContentRenderer content={contentModule} lang={lang} />
        </View>
      </ScrollView>
    </>
  );
}
