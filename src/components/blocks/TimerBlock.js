import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { getLocalized } from '../../utils/i18n';
import ScaledText from '../ScaledText';

export function TimerBlock({ item, lang }) {
  const defaultSeconds = Number.isFinite(item.seconds) && item.seconds > 0 ? item.seconds : 180;
  const [remaining, setRemaining] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Animated value for smooth progress animation
  const animatedRemaining = useSharedValue(defaultSeconds);

  useEffect(() => {
    // animate shared value whenever remaining changes
    animatedRemaining.value = withTiming(remaining, { duration: 1000 });
  }, [remaining]);

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

  function toggleRun() {
    setIsRunning(r => !r);
  }

  function reset() {
    setIsRunning(false);
    setRemaining(defaultSeconds);
    animatedRemaining.value = withTiming(defaultSeconds, { duration: 300 });
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return `${mm}:${ss}`;
  }

  const title = getLocalized({ ru: 'Таймер практики', ua: 'Таймер практики', eng: 'Practice timer', ger: 'Timer' }, lang, 'Таймер практики');

  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border, shadowColor: colors.textPrimary }] }>
      <View style={styles.headerRow}>
        <ScaledText style={[globalStyles.subtitle, { color: colors.textPrimary }]}>{title}</ScaledText>
        <ScaledText style={[styles.icon, { color: colors.textPrimary }]}>⏱️</ScaledText>
      </View>

      <View style={styles.timerWrap}>
        <View style={[styles.ring, { borderColor: colors.border }]}>
          <Animated.View style={[styles.innerFill, progressStyle, { backgroundColor: colors.softAccent }]} />
          <View style={styles.timeLabelWrap} pointerEvents="none">
            <ScaledText style={[globalStyles.title, styles.timeLabelOverride, { color: colors.textPrimary }]}>{formatTime(remaining)}</ScaledText>
          </View>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleRun}
          style={[styles.btn, isRunning ? styles.btnPause : styles.btnStart, isRunning ? { backgroundColor: colors.secondarySurface } : { backgroundColor: colors.softAccent, borderColor: colors.accent }]}
        >
          <ScaledText style={[globalStyles.text, styles.btnTextOverride, { color: colors.accent }]}>
            {isRunning ? 'Пауза' : 'Старт'}
          </ScaledText>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={reset} style={[styles.btn, styles.btnReset, { backgroundColor: colors.white, borderColor: colors.border }]}>
          <ScaledText style={[globalStyles.text, styles.btnTextOverride, { color: colors.textPrimary }]}>Скинути</ScaledText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const SIZE = 160;
const INNER_PADDING = 8;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
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
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  innerFill: {
    position: 'absolute',
    width: SIZE - INNER_PADDING * 2,
    height: SIZE - INNER_PADDING * 2,
    borderRadius: (SIZE - INNER_PADDING * 2) / 2,
  },
  timeLabelWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE - INNER_PADDING * 4,
    height: SIZE - INNER_PADDING * 4,
    borderRadius: (SIZE - INNER_PADDING * 4) / 2,
  },
  timeLabel: {
    fontSize: 28,
    fontWeight: '700',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginHorizontal: 6,
  },
  btnStart: {
    borderWidth: 1,
  },
  btnPause: {},
  btnReset: {
    borderWidth: 1,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  timeLabelOverride: {
    textAlign: 'center',
    includeFontPadding: false,
  },
  btnTextOverride: {
    fontWeight: '700',
    fontSize: 16,
  },
});
