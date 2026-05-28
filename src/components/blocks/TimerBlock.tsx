import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
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
  const { colors, typography } = useTheme();
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

  const dynamicStyles = StyleSheet.create({
    card: {
      borderRadius: specs.timer.borderRadius,
      padding: specs.timer.padding,
      marginVertical: specs.timer.marginVertical,
      backgroundColor: specs.timer.backgroundColor,
      borderColor: specs.timer.borderColor,
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
      marginBottom: 12,
    },
    icon: {
      fontSize: 18,
      opacity: 0.9,
    },
    timerWrap: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    ring: {
      width: 160,
      height: 160,
      borderRadius: 80,
      borderWidth: 2,
      borderColor: colors.cardBorder,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden' as any,
      backgroundColor: 'transparent',
    },
    innerFill: {
      position: 'absolute' as any,
      width: 160 - 16,
      height: 160 - 16,
      borderRadius: (160 - 16) / 2,
      backgroundColor: colors.accentLight,
    },
    timeLabelWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 160 - 32,
      height: 160 - 32,
      borderRadius: (160 - 32) / 2,
    },
    timeLabel: {
      fontSize: specs.timer.displayFontSize,
      fontWeight: specs.timer.displayFontWeight,
    },
    controls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    btn: {
      flex: 1,
      paddingVertical: specs.timer.buttonPadding,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: specs.timer.buttonBorderRadius,
      marginHorizontal: 6,
    },
    btnStart: {
      borderWidth: 1,
      borderColor: colors.accent,
      backgroundColor: colors.accentLight,
    },
    btnPause: {
      backgroundColor: colors.secondarySurface,
    },
    btnReset: {
      borderWidth: 1,
      borderColor: colors.cardBorder,
      backgroundColor: colors.white,
    },
    btnText: {
      fontSize: tokens.typography.fontSizeMd,
      fontWeight: tokens.typography.fontWeightBold,
    },
    timeLabelOverride: {
      textAlign: 'center',
      includeFontPadding: false,
    },
    btnTextOverride: {
      fontWeight: tokens.typography.fontWeightBold,
      fontSize: tokens.typography.fontSizeMd,
    },
  });

  return (
    <View style={dynamicStyles.card}>
      <View style={dynamicStyles.headerRow}>
        <ScaledText style={[typography.subtitle, { color: tokens.text.primary }]}> 
          {title}
        </ScaledText>
        <ScaledText style={dynamicStyles.icon}>⏱️</ScaledText>
      </View>

      <View style={dynamicStyles.timerWrap}>
        <View style={dynamicStyles.ring}>
          <Animated.View style={[dynamicStyles.innerFill, progressStyle]} />
          <View style={dynamicStyles.timeLabelWrap} pointerEvents="none">
            <ScaledText
              style={[
                typography.title,
                dynamicStyles.timeLabelOverride,
                { color: tokens.text.primary },
              ]}
            >
              {formatTime(remaining)}
            </ScaledText>
          </View>
        </View>
      </View>

      <View style={dynamicStyles.controls}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleRun}
          style={[
            dynamicStyles.btn,
            isRunning ? dynamicStyles.btnPause : dynamicStyles.btnStart,
          ]}
        >
          <ScaledText
            style={[
              typography.text,
              dynamicStyles.btnTextOverride,
              { color: colors.accent },
            ]}
          >
            {isRunning ? 'Пауза' : 'Старт'}
          </ScaledText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={reset}
          style={[dynamicStyles.btn, dynamicStyles.btnReset]}
        >
          <ScaledText
            style={[
              typography.text,
              dynamicStyles.btnTextOverride,
              { color: tokens.text.primary },
            ]}
          >
            Скинути
          </ScaledText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
