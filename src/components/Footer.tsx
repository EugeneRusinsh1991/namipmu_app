import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDesignTokens } from '../hooks/useDesignTokens';

export default function Footer() {
  const { tokens } = useDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safeArea: {
          width: '100%',
          backgroundColor: tokens.surface.background,
        },
        footer: {
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopWidth: tokens.borders.widthStandard,
          borderTopColor: tokens.borders.colorDefault,
          backgroundColor: tokens.surface.surfacePrimary,
          paddingVertical: tokens.spacing.standard,
          paddingHorizontal: tokens.spacing.standard,
        },
        text: {
          ...tokens.typography.text,
          textAlign: 'center',
          color: tokens.text.tertiary,
        },
      }),
    [tokens],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.footer}>
        <Text style={styles.text}>© 2026 Namipmu · All rights reserved</Text>
      </View>
    </SafeAreaView>
  );
}
