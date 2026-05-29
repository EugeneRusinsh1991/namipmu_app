import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDesignTokens } from '../hooks/useDesignTokens';

interface ProgressBarProps {
  progress: number; // 0 to 1
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const { tokens, specs } = useDesignTokens();

  const styles = useMemo(() => {
    const normalizedProgress = isNaN(progress) ? 0 : Math.max(0, Math.min(1, progress));
    const progressBarHeight =
      typeof (specs as any)?.progressBar?.height === 'number'
        ? (specs as any).progressBar.height
        : tokens.spacing.standard;
    const borderRadius =
      typeof tokens.borders.radiusFull === 'number'
        ? tokens.borders.radiusFull
        : tokens.borders.radiusStandard;

    return StyleSheet.create({
      container: {
        width: '100%',
        height: progressBarHeight,
        backgroundColor: tokens.interactive.border,
        borderRadius,
        overflow: 'hidden',
      },
      bar: {
        width: `${normalizedProgress * 100}%`,
        height: '100%',
        backgroundColor: tokens.interactive.accent,
        borderRadius,
      },
    });
  }, [tokens, specs, progress]);

  return (
    <View style={styles.container}>
      <View style={styles.bar} />
    </View>
  );
}
