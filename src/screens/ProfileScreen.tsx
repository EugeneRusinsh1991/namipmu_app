import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, layout as layoutTokens, radius, spacing, typography } from '../styles/theme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert('Выход', 'Вы уверены?', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Выход',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Ошибка выхода';
            Alert.alert('Ошибка', errorMessage);
          }
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Пожалуйста, войдите в аккаунт</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Мой профиль</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        {user.displayName && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Имя:</Text>
            <Text style={styles.value}>{user.displayName}</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <Text style={styles.label}>UID:</Text>
          <Text style={styles.value}>{user.uid}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Выход</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: layoutTokens.containerPadding,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  infoRow: {
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: typography.fontSizeSm,
    color: '#666',
    fontWeight: typography.fontWeight600 as any,
  },
  value: {
    fontSize: typography.fontSizeMd,
    color: '#333',
    marginTop: spacing.xs,
  },
  logoutButton: {
    backgroundColor: colors.danger,
    padding: spacing.md,
    borderRadius: radius.sm,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  logoutText: {
    color: colors.white,
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeight600 as any,
  },
});
