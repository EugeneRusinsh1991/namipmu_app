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
        />
      </LanguageProvider>
    </AuthProvider>
  );
}