import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/theme';
import { getLocalized } from '../../utils/i18n';

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

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={globalStyles.subtitle}>{title}</Text>
        <Text style={styles.icon}>⏱️</Text>
      </View>

      <View style={styles.timerWrap}>
        <View style={styles.ring}>
          <Animated.View style={[styles.innerFill, progressStyle]} />
          <View style={styles.timeLabelWrap} pointerEvents="none">
            <Text style={[globalStyles.title, styles.timeLabelOverride]}>{formatTime(remaining)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleRun}
          style={[styles.btn, isRunning ? styles.btnPause : styles.btnStart]}
        >
          <Text style={[globalStyles.text, styles.btnTextOverride]}>
            {isRunning ? 'Пауза' : 'Старт'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={reset} style={[styles.btn, styles.btnReset]}>
          <Text style={[globalStyles.text, styles.btnTextOverride]}>Скинути</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const SIZE = 160;
const INNER_PADDING = 8;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
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
    color: '#0b1226',
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
    borderColor: '#e6ddd6',
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
    backgroundColor: '#f6e7e8',
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
    color: '#0b1226',
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
    backgroundColor: '#f3e6e7',
    borderColor: '#ddb2b8',
    borderWidth: 1,
  },
  btnPause: {
    backgroundColor: '#f7f3f0',
  },
  btnReset: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6ddd6',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  btnTextStart: {
    color: '#fff',
  },
  btnTextPause: {
    color: '#0b1226',
  },
  btnTextReset: {
    color: '#0b1226',
  },
  timeLabelOverride: {
    textAlign: 'center',
    includeFontPadding: false,
  },
  btnTextOverride: {
    fontWeight: '700',
    fontSize: 16,
    color: '#7c5a61',
  },
});
