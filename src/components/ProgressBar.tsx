import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../styles/theme';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.bar,
          {
            width: `${clampedProgress}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 2, // Более тонкая, элегантная линия
    backgroundColor: colors.border,
    overflow: 'hidden',
    zIndex: 50,
  },
  bar: {
    height: '100%',
    backgroundColor: colors.accent, // Используем основной акцент (пыльная роза)
  },
});
