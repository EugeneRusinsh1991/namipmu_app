import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Footer from '../components/Footer';
import { LanguageProvider } from '../context/LanguageContext';
import { TextSizeProvider } from '../context/TextSizeContext';
import { ThemeProvider } from '../context/ThemeContext';
import { useDesignTokens } from '../hooks/useDesignTokens';

function LayoutContent() {
  const { tokens } = useDesignTokens();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: tokens.surface.background }]}> 
      <View style={styles.pageWrapper}>
        <View style={styles.content}>
          <Stack
            screenOptions={{
              contentStyle: [{ flex: 1, backgroundColor: tokens.surface.background }],
            }}
          >
            <Stack.Screen name="index" options={{ title: 'Навчання', headerShown: true }} />
            <Stack.Screen name="skin" options={{ title: 'Кожа', headerShown: true }} />
            <Stack.Screen name="pigment" options={{ title: 'Пігмент', headerShown: true }} />
          </Stack>
        </View>

        <Footer />
      </View>
    </SafeAreaView>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <TextSizeProvider>
        <LanguageProvider>
          <LayoutContent />
        </LanguageProvider>
      </TextSizeProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  pageWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  stack: {
    flex: 1,
  },
  stackContent: {
    flex: 1,
  },
});
