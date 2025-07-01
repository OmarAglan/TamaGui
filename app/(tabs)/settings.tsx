import {
  Bell,
  Camera,
  ChevronRight,
  Database,
  Globe,
  HelpCircle,
  Mail,
  Palette,
  Settings,
  Shield,
  User
} from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  H1,
  H3,
  Paragraph,
  ScrollView,
  Separator,
  Switch,
  Text,
  XStack,
  YStack
} from 'tamagui';

interface SettingItem {
  icon: any;
  title: string;
  description: string;
  type: 'toggle' | 'navigation' | 'input';
  value?: boolean | string;
  onPress?: () => void;
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const profileSettings: SettingItem[] = [
    {
      icon: User,
      title: 'Edit Profile',
      description: 'Update your personal information',
      type: 'navigation',
      onPress: () => console.log('Edit profile'),
    },
    {
      icon: Camera,
      title: 'Change Avatar',
      description: 'Upload a new profile picture',
      type: 'navigation',
      onPress: () => console.log('Change avatar'),
    },
  ];

  const appSettings: SettingItem[] = [
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Receive push notifications',
      type: 'toggle',
      value: notifications,
      onPress: () => setNotifications(!notifications),
    },
    {
      icon: Palette,
      title: 'Dark Mode',
      description: 'Use dark theme',
      type: 'toggle',
      value: darkMode,
      onPress: () => setDarkMode(!darkMode),
    },
    {
      icon: Globe,
      title: 'Language',
      description: 'English (US)',
      type: 'navigation',
      onPress: () => console.log('Language settings'),
    },
  ];

  const securitySettings: SettingItem[] = [
    {
      icon: Shield,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security',
      type: 'toggle',
      value: twoFactor,
      onPress: () => setTwoFactor(!twoFactor),
    },
    {
      icon: Database,
      title: 'Auto Backup',
      description: 'Automatically backup your data',
      type: 'toggle',
      value: autoBackup,
      onPress: () => setAutoBackup(!autoBackup),
    },
  ];

  const supportSettings: SettingItem[] = [
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help and contact support',
      type: 'navigation',
      onPress: () => console.log('Help & Support'),
    },
    {
      icon: Mail,
      title: 'Send Feedback',
      description: 'Share your thoughts with us',
      type: 'navigation',
      onPress: () => console.log('Send feedback'),
    },
  ];

  const SettingCard = ({ item }: { item: SettingItem }) => (
    <Card padding="$4" backgroundColor="$background" bordered>
      <XStack alignItems="center" space="$3">
        <YStack
          padding="$2"
          borderRadius="$3"
          backgroundColor="$blue3"
        >
          <item.icon size={20} color="$blue11" />
        </YStack>
        
        <YStack flex={1} space="$1">
          <Text fontSize="$4" fontWeight="500">
            {item.title}
          </Text>
          <Text fontSize="$3" color="$color11">
            {item.description}
          </Text>
        </YStack>
        
        {item.type === 'toggle' && (
          <Switch
            checked={item.value as boolean}
            onCheckedChange={item.onPress}
            size="$3"
          />
        )}
        
        {item.type === 'navigation' && (
          <Button
            size="$3"
            chromeless
            onPress={item.onPress}
          >
            <ChevronRight size={20} color="$color11" />
          </Button>
        )}
      </XStack>
    </Card>
  );

  return (
    <ScrollView flex={1}>
      <YStack padding="$4" space="$6">
        {/* Header */}
        <YStack space="$2">
          <XStack alignItems="center" space="$3">
            <Settings size={28} color="$color12" />
            <H1>Settings</H1>
          </XStack>
          <Paragraph color="$color11">
            Manage your account preferences and app settings.
          </Paragraph>
        </YStack>

        {/* Profile Section */}
        <YStack space="$4">
          <Card padding="$4" backgroundColor="$background" bordered>
            <XStack alignItems="center" space="$4">
              <Avatar circular size="$6">
                <Avatar.Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                <Avatar.Fallback backgroundColor="$blue10">
                  <Text color="white" fontSize="$5" fontWeight="600">
                    JD
                  </Text>
                </Avatar.Fallback>
              </Avatar>
              
              <YStack flex={1} space="$1">
                <Text fontSize="$5" fontWeight="600">
                  John Doe
                </Text>
                <Text fontSize="$3" color="$color11">
                  john.doe@example.com
                </Text>
                <Text fontSize="$3" color="$color10">
                  Administrator
                </Text>
              </YStack>
              
              <Button
                size="$3"
                backgroundColor="$blue9"
                color="white"
                borderRadius="$3"
              >
                Edit
              </Button>
            </XStack>
          </Card>
        </YStack>

        {/* Profile Settings */}
        <YStack space="$3">
          <H3>Profile</H3>
          <YStack space="$2">
            {profileSettings.map((item, index) => (
              <SettingCard key={index} item={item} />
            ))}
          </YStack>
        </YStack>

        {/* App Settings */}
        <YStack space="$3">
          <H3>Preferences</H3>
          <YStack space="$2">
            {appSettings.map((item, index) => (
              <SettingCard key={index} item={item} />
            ))}
          </YStack>
        </YStack>

        {/* Security Settings */}
        <YStack space="$3">
          <H3>Security & Privacy</H3>
          <YStack space="$2">
            {securitySettings.map((item, index) => (
              <SettingCard key={index} item={item} />
            ))}
          </YStack>
        </YStack>

        {/* Support Settings */}
        <YStack space="$3">
          <H3>Support</H3>
          <YStack space="$2">
            {supportSettings.map((item, index) => (
              <SettingCard key={index} item={item} />
            ))}
          </YStack>
        </YStack>

        {/* App Info */}
        <YStack space="$3">
          <H3>About</H3>
          <Card padding="$4" backgroundColor="$background" bordered>
            <YStack space="$3">
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$color11">Version</Text>
                <Text fontSize="$3" fontWeight="500">1.0.0</Text>
              </XStack>
              <Separator />
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$color11">Build</Text>
                <Text fontSize="$3" fontWeight="500">2023.12.15</Text>
              </XStack>
              <Separator />
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$color11">Platform</Text>
                <Text fontSize="$3" fontWeight="500">React Native</Text>
              </XStack>
            </YStack>
          </Card>
        </YStack>

        {/* Danger Zone */}
        <YStack space="$3">
          <H3 color="$red11">Danger Zone</H3>
          <Card padding="$4" backgroundColor="$red2" borderColor="$red8" borderWidth={1}>
            <YStack space="$3">
              <Text fontSize="$4" fontWeight="500" color="$red11">
                Delete Account
              </Text>
              <Text fontSize="$3" color="$red10">
                Permanently delete your account and all associated data. This action cannot be undone.
              </Text>
              <Button
                backgroundColor="$red9"
                color="white"
                borderRadius="$3"
                alignSelf="flex-start"
              >
                Delete Account
              </Button>
            </YStack>
          </Card>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
