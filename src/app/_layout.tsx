import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Footer from '../components/Footer';
import { LanguageProvider } from '../context/LanguageContext';
import { TextSizeProvider } from '../context/TextSizeContext';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/theme';

export default function Layout() {
  return (
    <TextSizeProvider>
      <LanguageProvider>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.pageWrapper}>
            <View style={styles.content}>
              <Stack
                screenOptions={{
                  contentStyle: [globalStyles.appBackground, styles.stackContent],
                }}
                style={styles.stack}
              >
                {/* Главная страница */}
                <Stack.Screen
                  name="index"
                  options={{
                    title: 'Навчання',
                    headerShown: true,
                  }}
                />

                {/* Сторінка Шкіра */}
                <Stack.Screen
                  name="skin"
                  options={{
                    title: 'Кожа',
                    headerShown: true,
                  }}
                />

                {/* Сторінка Пігмент */}
                <Stack.Screen
                  name="pigment"
                  options={{
                    title: 'Пігмент',
                    headerShown: true,
                  }}
                />
              </Stack>
            </View>

            <Footer />
          </View>
        </SafeAreaView>
      </LanguageProvider>
    </TextSizeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
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
    backgroundColor: colors.backgroundLight,
  },
});
