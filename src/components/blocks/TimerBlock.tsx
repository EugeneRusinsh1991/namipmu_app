import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, type TextStyle, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDesignTokens } from '../../hooks/useDesignTokens';
import { getLocalized } from '../../utils/i18n';
import AppButton from '../AppButton';
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
          borderRadius: specs.card.large.borderRadius,
          padding: specs.card.large.padding,
          marginVertical: tokens.spacing.standard,
          backgroundColor: tokens.surface.surfacePrimary,
          borderColor: tokens.interactive.border,
          borderWidth: tokens.borders.widthStandard,
          ...specs.card.large.shadow,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: tokens.spacing.standard,
        },
        headerTitle: {
          ...tokens.typography.subheading,
          color: tokens.text.primary,
        },
        icon: {
          ...tokens.typography.subheading,
          opacity: 0.9,
          marginLeft: tokens.spacing.standard,
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
          fontSize: specs.timer.displayFontSize,
          fontWeight: specs.timer.displayFontWeight,
          lineHeight: specs.timer.displayLineHeight,
          color: tokens.text.primary,
          textAlign: 'center' as const,
        },
        controls: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: tokens.spacing.standard,
        },
        buttonWrapper: {
          flex: 1,
          marginHorizontal: tokens.spacing.standard,
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
        <View style={styles.buttonWrapper}>
          <AppButton
            title={isRunning ? 'Пауза' : 'Старт'}
            variant="primary"
            shadowless
            onPress={toggleRun}
            accessibilityLabel={isRunning ? 'Пауза' : 'Старт'}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <AppButton
            title="Скинути"
            variant="primary"
            shadowless
            onPress={reset}
            accessibilityLabel="Скинути"
          />
        </View>
      </View>
    </View>
  );
};
