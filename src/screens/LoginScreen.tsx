import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { signin, signup, signinWithGoogle, signinWithApple, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleEmailAuth = async () => {
    setLocalError('');
    
    if (!email || !password) {
      setLocalError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      if (isSignup) {
        await signup(email, password);
        Alert.alert('Успех', 'Аккаунт создан!');
      } else {
        await signin(email, password);
        Alert.alert('Успех', 'Вы вошли!');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка аутентификации';
      setLocalError(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    setLocalError('');
    try {
      await signinWithGoogle();
      Alert.alert('Успех', 'Вы вошли через Google!');
    } catch (err: unknown) {
      setLocalError('Ошибка входа с Google');
    }
  };

  const handleAppleSignIn = async () => {
    setLocalError('');
    try {
      await signinWithApple();
      Alert.alert('Успех', 'Вы вошли через Apple!');
    } catch (err: unknown) {
      setLocalError('Ошибка входа с Apple');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {isSignup ? 'Создать аккаунт' : 'Вход'}
        </Text>

        {error && <Text style={styles.errorText}>{error}</Text>}
        {localError && <Text style={styles.errorText}>{localError}</Text>}

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!loading}
          placeholderTextColor="#999"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
          placeholderTextColor="#999"
        />

        {/* Email/Password Button */}
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

        {/* Toggle Signup/Signin */}
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

        {/* Google Sign In */}
        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={handleGoogleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>🔵 Вход через Google</Text>
        </TouchableOpacity>

        {/* Apple Sign In */}
        <TouchableOpacity
          style={[styles.button, styles.appleButton]}
          onPress={handleAppleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>🍎 Вход через Apple</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleText: {
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },
  errorText: {
    color: '#ff3b30',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 14,
  },
});
