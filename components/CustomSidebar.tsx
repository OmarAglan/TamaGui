import { LogOut } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import React from 'react';
import { Button, Separator, Text, useTheme, XStack, YStack } from 'tamagui';

interface CustomSidebarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export function CustomSidebar({ state, descriptors, navigation }: CustomSidebarProps) {
  const theme = useTheme();

  const handleLogout = () => {
    // Navigate to login and reset the navigation stack
    router.replace('/(tabs)/login');
  };

  return (
    <YStack
      width={250}
      height="100%"
      backgroundColor="$background"
      borderRightWidth={1}
      borderRightColor="$borderColor"
      padding="$4"
      space="$2"
    >
      {/* Header */}
      <YStack space="$4" marginBottom="$6">
        <Text fontSize="$6" fontWeight="bold" color="$color12">
          TamaGui
        </Text>
        <Separator />
      </YStack>

      {/* Navigation Items */}
      <YStack space="$1" flex={1}>
        {state.routes
          .filter((route: any) => route.name !== 'login') // Filter out login tab
          .map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined 
              ? options.tabBarLabel 
              : options.title !== undefined 
                ? options.title 
                : route.name;

            const isFocused = state.index === state.routes.findIndex((r: any) => r.key === route.key);

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <Button
                key={route.key}
                size="$4"
                justifyContent="flex-start"
                backgroundColor={isFocused ? '$blue4' : 'transparent'}
                borderColor={isFocused ? '$blue8' : 'transparent'}
                borderWidth={1}
                borderRadius="$3"
                color={isFocused ? '$blue11' : '$color11'}
                fontWeight={isFocused ? '600' : '400'}
                onPress={onPress}
                onLongPress={onLongPress}
                paddingHorizontal="$3"
                paddingVertical="$3"
                hoverStyle={{
                  backgroundColor: isFocused ? '$blue5' : '$color3',
                }}
                pressStyle={{
                  backgroundColor: isFocused ? '$blue6' : '$color4',
                }}
              >
                <XStack alignItems="center" space="$3" flex={1}>
                  {options.tabBarIcon && options.tabBarIcon({ 
                    color: isFocused ? theme.blue11.val : theme.color11.val, 
                    size: 20,
                    focused: isFocused 
                  })}
                  <Text 
                    color={isFocused ? '$blue11' : '$color11'}
                    fontSize="$4"
                    fontWeight={isFocused ? '600' : '400'}
                  >
                    {label}
                  </Text>
                </XStack>
              </Button>
            );
          })}
      </YStack>

      {/* Logout Button */}
      <YStack space="$3" marginTop="$4">
        <Separator />
        <Button
          size="$4"
          backgroundColor="$red4"
          borderColor="$red8"
          borderWidth={1}
          borderRadius="$3"
          color="$red11"
          onPress={handleLogout}
          paddingHorizontal="$3"
          paddingVertical="$3"
          hoverStyle={{
            backgroundColor: '$red5',
          }}
          pressStyle={{
            backgroundColor: '$red6',
          }}
        >
          <XStack alignItems="center" space="$3" flex={1} justifyContent="center">
            <LogOut size={20} color={theme.red11.val} />
            <Text color="$red11" fontSize="$4" fontWeight="600">
              Logout
            </Text>
          </XStack>
        </Button>
      </YStack>
    </YStack>
  );
}
