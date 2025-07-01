import { Eye, EyeOff, Lock, LogIn, Mail } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import {
  Button,
  Card,
  Form,
  H1,
  Input,
  Paragraph,
  ScrollView,
  Separator,
  Text,
  Theme,
  useTheme,
  XStack,
  YStack,
} from 'tamagui';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const theme = useTheme();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempted with:', { email, password });
      // Handle login logic here
    }, 2000);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
    // Handle forgot password logic
  };

  const handleSignUp = () => {
    console.log('Sign up pressed');
    // Handle sign up navigation
  };

  return (
    <Theme name="light">
      <ScrollView
        flex={1}
        backgroundColor="$background"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="$4"
          space="$4"
        >
          {/* Logo/Header Section */}
          <YStack alignItems="center" space="$2" marginBottom="$6">
            <H1 color="$color" fontSize="$8" fontWeight="bold">
              Welcome Back
            </H1>
            <Paragraph color="$color11" textAlign="center" fontSize="$4">
              Sign in to your account to continue
            </Paragraph>
          </YStack>

          {/* Login Form Card */}
          <Card
            eleveted
            width="100%"
            maxWidth={400}
            padding="$6"
            backgroundColor="$background"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
          >
            <Form onSubmit={handleLogin} space="$4">
              {/* Email Input */}
              <YStack space="$2">
                <Text fontSize="$3" fontWeight="600" color="$color">
                  Email
                </Text>
                <XStack
                  alignItems="center"
                  borderWidth={1}
                  borderColor={errors.email ? '$red8' : '$borderColor'}
                  borderRadius="$3"
                  backgroundColor="$background"
                  paddingHorizontal="$3"
                  paddingVertical="$2"
                >
                  <Mail size={20} color={theme.color11.val} />
                  <Input
                    flex={1}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    borderWidth={0}
                    backgroundColor="transparent"
                    paddingHorizontal="$2"
                    fontSize="$4"
                  />
                </XStack>
                {errors.email && (
                  <Text fontSize="$2" color="$red10">
                    {errors.email}
                  </Text>
                )}
              </YStack>

              {/* Password Input */}
              <YStack space="$2">
                <Text fontSize="$3" fontWeight="600" color="$color">
                  Password
                </Text>
                <XStack
                  alignItems="center"
                  borderWidth={1}
                  borderColor={errors.password ? '$red8' : '$borderColor'}
                  borderRadius="$3"
                  backgroundColor="$background"
                  paddingHorizontal="$3"
                  paddingVertical="$2"
                >
                  <Lock size={20} color={theme.color11.val} />
                  <Input
                    flex={1}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    borderWidth={0}
                    backgroundColor="transparent"
                    paddingHorizontal="$2"
                    fontSize="$4"
                  />
                  <Button
                    chromeless
                    onPress={() => setShowPassword(!showPassword)}
                    padding="$1"
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={theme.color11.val} />
                    ) : (
                      <Eye size={20} color={theme.color11.val} />
                    )}
                  </Button>
                </XStack>
                {errors.password && (
                  <Text fontSize="$2" color="$red10">
                    {errors.password}
                  </Text>
                )}
              </YStack>

              {/* Forgot Password */}
              <XStack justifyContent="flex-end">
                <Button
                  chromeless
                  onPress={handleForgotPassword}
                  padding="$1"
                >
                  <Text fontSize="$3" color="$blue10">
                    Forgot Password?
                  </Text>
                </Button>
              </XStack>

              {/* Login Button */}
              <Button
                backgroundColor="$blue9"
                color="white"
                borderRadius="$3"
                paddingVertical="$3"
                fontSize="$4"
                fontWeight="600"
                onPress={handleLogin}
                disabled={isLoading}
                opacity={isLoading ? 0.7 : 1}
                marginTop="$2"
              >
                <XStack alignItems="center" space="$2">
                  <LogIn size={20} color="white" />
                  <Text color="white" fontSize="$4" fontWeight="600">
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Text>
                </XStack>
              </Button>
            </Form>
          </Card>

          {/* Sign Up Section */}
          <YStack alignItems="center" space="$3" marginTop="$4">
            <Separator />
            <XStack alignItems="center" space="$2">
              <Text fontSize="$3" color="$color11">
                Don't have an account?
              </Text>
              <Button
                chromeless
                onPress={handleSignUp}
                padding="$1"
              >
                <Text fontSize="$3" color="$blue10" fontWeight="600">
                  Sign Up
                </Text>
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default LoginScreen;