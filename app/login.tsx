import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  Button,
  Card,
  Form,
  H1,
  Input,
  Label,
  Paragraph,
  Separator,
  Spinner,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import { Alert, Eye, EyeOff, Lock, Mail } from '@tamagui/lucide-icons';

interface LoginForm {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginScreen() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication - in real app, validate with backend
      if (form.email === 'demo@example.com' && form.password === 'password') {
        // Store auth state (in real app, use secure storage)
        // For demo, we'll just navigate to dashboard
        router.push('/dashboard');
      } else {
        setErrors({ general: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = (field: keyof LoginForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" backgroundColor="$background">
      <YStack width="100%" maxWidth={400} space="$4">
        {/* Header */}
        <YStack space="$2" alignItems="center">
          <H1 color="$color12">Welcome Back</H1>
          <Paragraph color="$color11" textAlign="center">
            Sign in to your account to continue
          </Paragraph>
        </YStack>

        {/* Login Form */}
        <Card elevate size="$4" bordered padding="$6">
          <Form onSubmit={handleLogin} space="$4">
            {/* General Error */}
            {errors.general && (
              <XStack
                backgroundColor="$red2"
                borderColor="$red6"
                borderWidth={1}
                borderRadius="$4"
                padding="$3"
                space="$2"
                alignItems="center"
              >
                <Alert size={16} color="$red10" />
                <Text color="$red11" fontSize="$3">
                  {errors.general}
                </Text>
              </XStack>
            )}

            {/* Email Field */}
            <YStack space="$2">
              <Label htmlFor="email" color="$color12">
                Email Address
              </Label>
              <XStack
                borderWidth={1}
                borderColor={errors.email ? '$red8' : '$borderColor'}
                borderRadius="$4"
                alignItems="center"
                paddingLeft="$3"
                backgroundColor="$background"
              >
                <Mail size={16} color="$color10" />
                <Input
                  id="email"
                  flex={1}
                  borderWidth={0}
                  backgroundColor="transparent"
                  placeholder="Enter your email"
                  value={form.email}
                  onChangeText={(text) => updateForm('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </XStack>
              {errors.email && (
                <Text color="$red10" fontSize="$2">
                  {errors.email}
                </Text>
              )}
            </YStack>

            {/* Password Field */}
            <YStack space="$2">
              <Label htmlFor="password" color="$color12">
                Password
              </Label>
              <XStack
                borderWidth={1}
                borderColor={errors.password ? '$red8' : '$borderColor'}
                borderRadius="$4"
                alignItems="center"
                paddingLeft="$3"
                backgroundColor="$background"
              >
                <Lock size={16} color="$color10" />
                <Input
                  id="password"
                  flex={1}
                  borderWidth={0}
                  backgroundColor="transparent"
                  placeholder="Enter your password"
                  value={form.password}
                  onChangeText={(text) => updateForm('password', text)}
                  secureTextEntry={!showPassword}
                  autoComplete="current-password"
                />
                <Button
                  size="$2"
                  chromeless
                  onPress={() => setShowPassword(!showPassword)}
                  icon={showPassword ? EyeOff : Eye}
                />
              </XStack>
              {errors.password && (
                <Text color="$red10" fontSize="$2">
                  {errors.password}
                </Text>
              )}
            </YStack>

            {/* Login Button */}
            <Button
              size="$4"
              theme="active"
              onPress={handleLogin}
              disabled={isLoading}
              icon={isLoading ? () => <Spinner size="small" color="white" /> : undefined}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form>
        </Card>

        {/* Demo Credentials */}
        <Card backgroundColor="$blue2" borderColor="$blue6" borderWidth={1} padding="$4">
          <YStack space="$2">
            <Text fontWeight="600" color="$blue11">
              Demo Credentials
            </Text>
            <Text color="$blue10" fontSize="$3">
              Email: demo@example.com
            </Text>
            <Text color="$blue10" fontSize="$3">
              Password: password
            </Text>
          </YStack>
        </Card>

        <Separator />

        {/* Footer */}
        <YStack alignItems="center" space="$2">
          <Paragraph color="$color11" fontSize="$3" textAlign="center">
            Don't have an account?{' '}
            <Text color="$blue10" fontWeight="600">
              Sign up here
            </Text>
          </Paragraph>
        </YStack>
      </YStack>
    </YStack>
  );
}
