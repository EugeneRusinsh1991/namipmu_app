import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTextSize } from '../context/TextSizeContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../styles/theme';

export default function HeaderTextSizeControls() {
  const {
    fontScale,
    decreaseFontSize,
    increaseFontSize,
  } = useTextSize();
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={decreaseFontSize}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: themeColors.white, borderColor: themeColors.border },
          pressed && styles.buttonPressed,
        ]}
        accessibilityLabel="Уменьшить шрифт"
      >
        <Text style={[styles.buttonText, { color: themeColors.textPrimary }]}>A-</Text>
      </Pressable>
      <View style={[styles.labelContainer, { backgroundColor: themeColors.white, borderColor: themeColors.border }]}>
        <Text style={[styles.label, { color: themeColors.textPrimary }]}>{Math.round(fontScale * 100)}%</Text>
      </View>
      <Pressable
        onPress={increaseFontSize}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: themeColors.white, borderColor: themeColors.border },
          pressed && styles.buttonPressed,
        ]}
        accessibilityLabel="Увеличить шрифт"
      >
        <Text style={[styles.buttonText, { color: themeColors.textPrimary }]}>A+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  labelContainer: {
    marginHorizontal: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: 13,
  },
});
