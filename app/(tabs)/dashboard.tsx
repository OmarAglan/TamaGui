import {
  Activity,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users
} from '@tamagui/lucide-icons';
import React from 'react';
import {
  Button,
  Card,
  H1,
  H2,
  H3,
  Paragraph,
  ScrollView,
  Text,
  XStack,
  YStack
} from 'tamagui';

interface DashboardStats {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
  backgroundColor: string;
}

const stats: DashboardStats[] = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
    color: '$green9',
    backgroundColor: '$green3',
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+180.1%',
    trend: 'up',
    icon: Users,
    color: '$blue9',
    backgroundColor: '$blue3',
  },
  {
    title: 'Sales',
    value: '+12,234',
    change: '+19%',
    trend: 'up',
    icon: ShoppingCart,
    color: '$purple9',
    backgroundColor: '$purple3',
  },
  {
    title: 'Active Now',
    value: '573',
    change: '+201',
    trend: 'up',
    icon: Activity,
    color: '$orange9',
    backgroundColor: '$orange3',
  },
];



export default function DashboardScreen() {

  const StatCard = ({ stat }: { stat: DashboardStats }) => (
    <Card flex={1} padding="$4" bordered>
      <XStack space="$3">
        <YStack space="$1" flex={1}>
          <Text fontSize="$3">
            {stat.title}
          </Text>
          <H2 fontSize="$7" fontWeight="700">
            {stat.value}
          </H2>
          <XStack space="$1">
            <TrendingUp size={12} />
            <Text fontSize="$2">
              {stat.change} from last month
            </Text>
          </XStack>
        </YStack>
        <YStack padding="$2">
          <stat.icon size={20} />
        </YStack>
      </XStack>
    </Card>
  );





  return (
    <ScrollView flex={1}>
      <YStack padding="$4" space="$6">
        {/* Welcome Section */}
        <YStack space="$2">
          <H1>Welcome back, John!</H1>
          <Paragraph color="$color11">
            Here's what's happening with your business today.
          </Paragraph>
        </YStack>

        {/* Stats Grid */}
        <YStack space="$4">
          <H3>Overview</H3>
          <XStack space="$4" flexWrap="wrap">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </XStack>
        </YStack>

        {/* Recent Activity */}
        <YStack space="$4">
          <H3>Recent Activity</H3>
          <Card padding="$4" backgroundColor="$background" bordered>
            <YStack space="$3">
              {[
                { action: 'New user registered', time: '2 minutes ago', type: 'user' },
                { action: 'Order #1234 completed', time: '5 minutes ago', type: 'order' },
                { action: 'Payment received', time: '10 minutes ago', type: 'payment' },
                { action: 'New review posted', time: '15 minutes ago', type: 'review' },
              ].map((activity, index) => (
                <XStack key={index} alignItems="center" space="$3">
                  <YStack
                    width={8}
                    height={8}
                    borderRadius="$10"
                    backgroundColor="$blue10"
                  />
                  <YStack flex={1}>
                    <Text fontWeight="500">{activity.action}</Text>
                    <Text fontSize="$2" color="$color11">
                      {activity.time}
                    </Text>
                  </YStack>
                </XStack>
              ))}
            </YStack>
          </Card>
        </YStack>

        {/* Quick Actions */}
        <YStack space="$4">
          <H3>Quick Actions</H3>
          <XStack space="$3" flexWrap="wrap">
            <Button flex={1} minWidth={150} size="$4" theme="blue">
              Add New User
            </Button>
            <Button flex={1} minWidth={150} size="$4" variant="outlined">
              Generate Report
            </Button>
            <Button flex={1} minWidth={150} size="$4" variant="outlined">
              View Analytics
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
