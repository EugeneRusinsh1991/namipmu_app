import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useDesignTokens } from '../hooks/useDesignTokens';
import { spacing, typography } from '../styles/theme';

export default function Footer() {
  const { colors } = useTheme();
  const { tokens } = useDesignTokens();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: tokens.surface.background }]}> 
      <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: tokens.surface.surfacePrimary, paddingVertical: spacing.lg }]}>
        <Text style={[styles.text, { color: tokens.text.tertiary, fontSize: typography.fontSizeSm }]}>© 2026 Namipmu · All rights reserved</Text>
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
