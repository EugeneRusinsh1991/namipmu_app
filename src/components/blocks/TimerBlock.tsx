import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, type TextStyle, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDesignTokens } from '../../hooks/useDesignTokens';
import { getLocalized } from '../../utils/i18n';
import ScaledText from '../ScaledText';

/**
 * Props для TimerBlock
 */
interface TimerBlockProps {
  item: {
    seconds?: number;
    [key: string]: any;
  };
  lang: string;
  heroOverlapStyle?: any;
}

/**
 * Block компонент для интерактивного таймера практики
 */
export const TimerBlock: FC<TimerBlockProps> = ({ item, lang }) => {
  const defaultSeconds = Number.isFinite(item.seconds) && item.seconds > 0 ? item.seconds : 180;
  const [remaining, setRemaining] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { tokens, specs } = useDesignTokens();

  // Animated value for smooth progress animation
  const animatedRemaining = useSharedValue(defaultSeconds);

  useEffect(() => {
    // animate shared value whenever remaining changes
    animatedRemaining.value = withTiming(remaining, { duration: 1000 });
  }, [remaining, animatedRemaining]);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          const next = Math.max(0, prev - 1);
          if (next === 0) setIsRunning(false);
          return next;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    // stop when reach 0
    if (remaining === 0) setIsRunning(false);
  }, [remaining]);

  const progressStyle = useAnimatedStyle(() => {
    const fraction = animatedRemaining.value / defaultSeconds;
    // scale the inner fill to reflect remaining time
    return {
      transform: [{ scale: fraction }],
      opacity: 0.98,
    };
  });

  const toggleRun = () => {
    setIsRunning(r => !r);
  };

  const reset = () => {
    setIsRunning(false);
    setRemaining(defaultSeconds);
    animatedRemaining.value = withTiming(defaultSeconds, { duration: 300 });
  };

  const formatTime = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const title = getLocalized(
    { ru: 'Таймер практики', ua: 'Таймер практики', eng: 'Practice timer', ger: 'Timer' },
    lang,
    'Таймер практики'
  );

  type TimerStyles = {
    card: ViewStyle;
    headerRow: ViewStyle;
    headerTitle: TextStyle;
    icon: TextStyle;
    timerWrap: ViewStyle;
    ring: ViewStyle;
    innerFill: ViewStyle;
    timeLabelWrap: ViewStyle;
    timeLabel: TextStyle;
    controls: ViewStyle;
    btn: ViewStyle;
    btnStart: ViewStyle;
    btnPause: ViewStyle;
    btnReset: ViewStyle;
    btnTextOverride: TextStyle;
  };

  const styles = useMemo(() => {
      const ringSize = specs.timer.ringSize;
      const innerSize = ringSize - 16;

      return StyleSheet.create<TimerStyles>({
        card: {
          borderRadius: specs.timer.borderRadius,
          padding: specs.timer.containerPadding,
          marginVertical: specs.timer.marginVertical,
          backgroundColor: tokens.surface.surfaceSecondary,
          borderColor: tokens.interactive.border,
          borderWidth: 1,
          shadowColor: tokens.text.primary,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: tokens.spacing.md,
        },
        headerTitle: {
          fontSize: tokens.typography.fontSizeLg,
          fontWeight: tokens.typography.fontWeightBold,
          color: tokens.text.primary,
        },
        icon: {
          fontSize: tokens.typography.fontSizeLg,
          opacity: 0.9,
          marginLeft: tokens.spacing.sm,
        },
        timerWrap: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        ring: {
          width: ringSize,
          height: ringSize,
          borderRadius: ringSize / 2,
          borderWidth: 2,
          borderColor: tokens.interactive.accent,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden' as any,
          backgroundColor: tokens.interactive.accentLight,
        },
        innerFill: {
          position: 'absolute' as any,
          width: innerSize,
          height: innerSize,
          borderRadius: innerSize / 2,
          backgroundColor: tokens.interactive.accent,
        },
        timeLabelWrap: {
          alignItems: 'center',
          justifyContent: 'center',
          width: innerSize - 16,
          height: innerSize - 16,
          borderRadius: (innerSize - 16) / 2,
        },
        timeLabel: {
          ...tokens.typography.heading1,
          color: tokens.text.primary,
          textAlign: 'center' as const,
        },
        controls: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: tokens.spacing.lg,
        },
        btn: {
          flex: 1,
          paddingVertical: specs.timer.buttonPadding,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: specs.timer.buttonBorderRadius,
          marginHorizontal: tokens.spacing.xs,
        },
        btnStart: {
          borderWidth: 1,
          borderColor: tokens.interactive.accent,
          backgroundColor: tokens.interactive.accentLight,
        },
        btnPause: {
          backgroundColor: tokens.surface.surfacePrimary,
        },
        btnReset: {
          borderWidth: 1,
          borderColor: tokens.interactive.border,
          backgroundColor: tokens.surface.surfacePrimary,
        },
        btnTextOverride: {
          fontWeight: tokens.typography.fontWeightBold,
          fontSize: tokens.typography.fontSizeMd,
          color: tokens.text.primary,
        },
      });
    },
    [tokens, specs]
  );

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <ScaledText style={styles.headerTitle}>{title}</ScaledText>
        <ScaledText style={styles.icon}>⏱️</ScaledText>
      </View>

      <View style={styles.timerWrap}>
        <View style={styles.ring}>
          <Animated.View style={[styles.innerFill, progressStyle]} />
          <View style={styles.timeLabelWrap} pointerEvents="none">
            <ScaledText style={[styles.timeLabel, { includeFontPadding: false }]}> 
              {formatTime(remaining)}
            </ScaledText>
          </View>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleRun}
          style={[
            styles.btn,
            isRunning ? styles.btnPause : styles.btnStart,
          ]}
        >
          <ScaledText style={[styles.btnTextOverride, { color: tokens.text.primary }]}> 
            {isRunning ? 'Пауза' : 'Старт'}
          </ScaledText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={reset}
          style={[styles.btn, styles.btnReset]}
        >
          <ScaledText style={[styles.btnTextOverride, { color: tokens.text.primary }]}> 
            Скинути
          </ScaledText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
