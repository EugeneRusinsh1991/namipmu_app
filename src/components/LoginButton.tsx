import React, { useState } from 'react';
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, radius, spacing, typography } from '../styles/theme';

export default function LoginButton() {
  const { signin, signup, signinWithGoogle, logout, loading, user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  const handleEmailAuth = async () => {
    setError('');
    if (!email || !password) {
      setError('Заполните email и пароль');
      return;
    }

    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await signin(email, password);
      }
      setEmail('');
      setPassword('');
      setIsSignup(false);
      setModalVisible(false);
      Alert.alert('Успех', isSignup ? 'Аккаунт создан!' : 'Вы вошли!');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка';
      setError(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signinWithGoogle();
      setModalVisible(false);
      Alert.alert('Успех', 'Вы вошли через Google!');
    } catch (err: unknown) {
      setError('Ошибка входа с Google');
    }
  };

  const handleLogout = async () => {
    console.log('Logout button pressed');
    // Для веб-версии используем window.confirm
    if (typeof window !== 'undefined' && window.confirm('Вы уверены? Вы выйдете из аккаунта.')) {
      try {
        console.log('Calling logout function...');
        await logout();
        console.log('Logout successful, closing modal');
        setModalVisible(false);
        Alert.alert('Успех', 'Вы вышли из аккаунта');
      } catch (err: unknown) {
        console.error('Logout error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Ошибка выхода';
        Alert.alert('Ошибка', errorMessage);
      }
    } else {
      // Также предусмотрим Alert.alert для мобильных
      Alert.alert('Выход', 'Вы уверены?', [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Выход',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              setModalVisible(false);
              Alert.alert('Успех', 'Вы вышли из аккаунта');
            } catch (err: unknown) {
              const errorMessage = err instanceof Error ? err.message : 'Ошибка выхода';
              Alert.alert('Ошибка', errorMessage);
            }
          },
        },
      ]);
    }
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={() => {
          console.log('Login button pressed');
          setModalVisible(true);
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.loginButtonText}>
          {user ? `👤 ${user.email}` : '🔐 ЛОГИН'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            {!user ? (
              <>
                <Text style={styles.modalTitle}>
                  {isSignup ? 'Создать аккаунт' : 'Вход'}
                </Text>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  editable={!loading}
                  placeholderTextColor="#999"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  editable={!loading}
                  placeholderTextColor="#999"
                />

                <TouchableOpacity
                  style={[styles.button, styles.primaryButton, loading && styles.disabledButton]}
                  onPress={handleEmailAuth}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>
                      {isSignup ? 'Создать аккаунт' : 'Вход'}
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
                  <Text style={styles.toggleText}>
                    {isSignup ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Создать'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>или</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                  style={[styles.button, styles.googleButton]}
                  onPress={handleGoogleSignIn}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>🔵 Вход через Google</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Мой профиль</Text>
                
                <View style={styles.profileInfo}>
                  <Text style={styles.profileLabel}>Email:</Text>
                  <Text style={styles.profileValue}>{user.email}</Text>
                </View>

                {user.displayName && (
                  <View style={styles.profileInfo}>
                    <Text style={styles.profileLabel}>Имя:</Text>
                    <Text style={styles.profileValue}>{user.displayName}</Text>
                  </View>
                )}

                <TouchableOpacity
                  style={[styles.button, styles.logoutButton]}
                  onPress={handleLogout}
                >
                  <Text style={styles.buttonText}>🚪 ЛОГАУТ</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    marginTop: spacing.sm / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeight600 as any,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.modal,
    borderTopRightRadius: radius.modal,
    padding: spacing.xl,
    maxHeight: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: spacing.lg,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    fontSize: typography.fontSizeMd,
    backgroundColor: '#fafafa',
  },
  button: {
    padding: 14,
    borderRadius: radius.sm,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  googleButton: {
    backgroundColor: colors.google,
  },
  logoutButton: {
    backgroundColor: colors.danger,
    marginTop: spacing.lg,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeight600 as any,
  },
  toggleText: {
    color: colors.primary,
    textAlign: 'center',
    fontSize: typography.fontSizeSm,
    marginBottom: spacing.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.sm,
    color: colors.muted,
    fontSize: typography.fontSizeSm,
  },
  errorText: {
    color: colors.danger,
    marginBottom: spacing.sm,
    textAlign: 'center',
    fontSize: typography.fontSizeSm,
  },
  profileInfo: {
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileLabel: {
    fontSize: typography.fontSizeSm,
    color: '#666',
    fontWeight: typography.fontWeight600 as any,
  },
  profileValue: {
    fontSize: typography.fontSizeMd,
    color: '#333',
    marginTop: spacing.xs,
  },
});
