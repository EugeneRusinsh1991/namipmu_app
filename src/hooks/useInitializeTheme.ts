import { useCallback, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { storage } from '../utils/storage';

export type ThemeMode = 'light' | 'dark';
const THEME_KEY = '@app:theme';

export function useInitializeTheme() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [fontScale, setFontScale] = useState<number>(1);

  useEffect(() => {
    async function initTheme() {
      try {
        const savedTheme = await storage.getItem(THEME_KEY);
        const systemTheme = Appearance.getColorScheme();
        const initialTheme = (savedTheme || systemTheme || 'light') as ThemeMode;
        setTheme(initialTheme === 'dark' ? 'dark' : 'light');
      } catch {
        const systemTheme = Appearance.getColorScheme();
        setTheme(systemTheme === 'dark' ? 'dark' : 'light');
      }
    }

    initTheme();
  }, []);

  const toggleTheme = useCallback(async (): Promise<void> => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    await storage.setItem(THEME_KEY, nextTheme);
  }, [theme]);

  return {
    theme,
    fontScale,
    setFontScale,
    toggleTheme,
  };
}
