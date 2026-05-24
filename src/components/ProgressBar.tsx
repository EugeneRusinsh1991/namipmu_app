import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  // Ensure progress is a valid number to prevent "Value is undefined" errors in native styles
  const clampedProgress = isNaN(progress) ? 0 : Math.max(0, Math.min(100, progress));

  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.border }]}>
      <View
        style={[
          styles.bar,
          {
            width: `${clampedProgress}%`,
            backgroundColor: colors.accent,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 4, // Увеличено в 2 раза для лучшей видимости (база 2px)
    overflow: 'hidden',
    zIndex: 50,
  },
  bar: {
    height: '100%',
  },
});
