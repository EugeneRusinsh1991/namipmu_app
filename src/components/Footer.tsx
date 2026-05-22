import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

export default function Footer() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.footer}>
        <Text style={styles.text}>© 2026 Namipmu · All rights reserved</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.backgroundLight,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingVertical: spacing.sm,
    backgroundColor: colors.backgroundLight,
  },
  text: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeSm,
    textAlign: 'center',
  },
});
