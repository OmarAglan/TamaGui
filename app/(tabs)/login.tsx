import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  Card,
  H1,
  Input,
  Paragraph,
  Spinner,
  Text,
  YStack,
} from 'tamagui';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication
      if (email === 'demo@example.com' && password === 'password') {
        router.push('/(tabs)/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <YStack flex={1}>
      <YStack flex={1}>
        <H1>Welcome Back</H1>
        <Paragraph>Sign in to your account to continue</Paragraph>

        <Card bordered>
          <YStack>
            {error && (
              <Text color="$red10">{error}</Text>
            )}

            <YStack>
              <Text>Email</Text>
              <Input
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </YStack>

            <YStack>
              <Text>Password</Text>
              <Input
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </YStack>

            <Button
              size="$4"
              onPress={handleLogin}
              disabled={isLoading}
              icon={isLoading ? <Spinner size="small" /> : undefined}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </YStack>
        </Card>

        <Card bordered>
          <YStack>
            <Text fontWeight="600">Demo Credentials</Text>
            <Text>Email: demo@example.com</Text>
            <Text>Password: password</Text>
          </YStack>
        </Card>
      </YStack>
    </YStack>
  );
}
