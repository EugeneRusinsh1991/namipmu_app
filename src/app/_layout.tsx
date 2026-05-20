import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { LanguageProvider } from '../context/LanguageContext';
import { globalStyles } from '../styles/globalStyles';

export default function Layout() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Stack
          screenOptions={{
            contentStyle: globalStyles.appBackground,
          }}
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
      </LanguageProvider>
    </AuthProvider>
  );
}