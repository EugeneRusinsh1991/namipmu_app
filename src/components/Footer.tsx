import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, typography } from '../styles/theme';

export default function Footer() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.backgroundLight }]}>
      <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.secondarySurface, paddingVertical: spacing.lg }]}>
        <Text style={[styles.text, { color: colors.secondaryText, fontSize: typography.fontSizeSm }]}>© 2026 Namipmu · All rights reserved</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
  },
  text: {
    textAlign: 'center',
  },
});
