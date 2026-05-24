import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
let AsyncStorage;
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  // fallback - AsyncStorage may not be installed in this environment
  AsyncStorage = null;
}

import * as themeModule from '../styles/theme';
import { darkColors, lightColors } from '../styles/tokens/colors';
const componentDefaultsModule = require('../styles/componentDefaults');

const THEME_KEY = '@app:theme';

const ThemeContext = createContext({
  theme: 'light',
  colors: lightColors,
  isDark: false,
  toggleTheme: () => {},
  componentStyles: componentDefaultsModule.componentStyles,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [colors, setColors] = useState(lightColors);
  const [componentStyles, setComponentStyles] = useState(componentDefaultsModule.componentStyles);

  useEffect(() => {
    (async () => {
      try {
        let saved = null;
        if (AsyncStorage) saved = await AsyncStorage.getItem(THEME_KEY);
        const system = Appearance.getColorScheme();
        const initial = saved || system || 'light';
        applyTheme(initial);
      } catch (e) {
        applyTheme(Appearance.getColorScheme() || 'light');
      }
    })();
  }, []);

  function applyTheme(name) {
    const n = name === 'dark' ? 'dark' : 'light';
    const newColors = n === 'dark' ? darkColors : lightColors;
    console.log('[ThemeContext] applyTheme ->', n);
    setTheme(n);
    setColors(newColors);
    // sync global theme module exports so legacy static imports update
    try {
      if (themeModule && themeModule.colors && typeof themeModule.colors === 'object') {
        Object.keys(themeModule.colors).forEach(k => delete themeModule.colors[k]);
        Object.keys(newColors).forEach(k => { themeModule.colors[k] = newColors[k]; });
      }
    } catch (err) {
      console.warn('[ThemeContext] failed to sync themeModule.colors', err);
    }

    // create reactive component styles
    if (typeof componentDefaultsModule.createComponentStyles === 'function') {
      setComponentStyles(componentDefaultsModule.createComponentStyles(newColors));
    } else if (componentDefaultsModule.componentStyles) {
      setComponentStyles(componentDefaultsModule.componentStyles);
    }
  }

  const toggleTheme = async () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    console.log('[ThemeContext] toggleTheme ->', next);
    applyTheme(next);
    try {
      if (AsyncStorage) await AsyncStorage.setItem(THEME_KEY, next);
    } catch (e) {
      // ignore
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, isDark: theme === 'dark', toggleTheme, componentStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
