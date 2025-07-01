import {
  Activity,
  BarChart3,
  DollarSign,
  Eye,
  TrendingDown,
  TrendingUp,
  Users,
} from '@tamagui/lucide-icons';
import React from 'react';
import {
  Card,
  H1,
  H3,
  Paragraph,
  ScrollView,
  Text,
  XStack,
  YStack,
} from 'tamagui';

interface AnalyticsMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

const analyticsMetrics: AnalyticsMetric[] = [
  {
    title: 'Page Views',
    value: '45,231',
    change: '+12.5%',
    trend: 'up',
    icon: Eye,
    color: '$blue9',
  },
  {
    title: 'Unique Visitors',
    value: '12,543',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: '$green9',
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '-0.5%',
    trend: 'down',
    icon: TrendingUp,
    color: '$blue10',
  },
  {
    title: 'Revenue per Visit',
    value: '$24.50',
    change: '+15.3%',
    trend: 'up',
    icon: DollarSign,
    color: '$red9',
  },
];

export default function AnalyticsScreen() {
  const MetricCard = ({ metric }: { metric: AnalyticsMetric }) => (
    <Card flex={1} padding="$4" bordered>
      <XStack space="$3" alignItems="center">
        <YStack
          padding="$3"
          borderRadius="$4"
          backgroundColor={`${metric.color.replace('9', '3')}`}
        >
          <metric.icon size={24} color={metric.color} />
        </YStack>
        <YStack flex={1} space="$1">
          <Text fontSize="$3" color="$color11">
            {metric.title}
          </Text>
          <H3 fontSize="$6" fontWeight="700">
            {metric.value}
          </H3>
          <XStack alignItems="center" space="$1">
            {metric.trend === 'up' ? (
              <TrendingUp size={14} color="$green10" />
            ) : (
              <TrendingDown size={14} color="$red10" />
            )}
            <Text
              fontSize="$2"
              color={metric.trend === 'up' ? '$green10' : '$red10'}
              fontWeight="500"
            >
              {metric.change}
            </Text>
            <Text fontSize="$2" color="$color11">
              vs last month
            </Text>
          </XStack>
        </YStack>
      </XStack>
    </Card>
  );

  return (
    <ScrollView flex={1}>
      <YStack padding="$4" space="$6">
        {/* Header */}
        <YStack space="$2">
          <XStack alignItems="center" space="$3">
            <BarChart3 size={28} color="$color12" />
            <H1>Analytics</H1>
          </XStack>
          <Paragraph color="$color11">
            Track your website performance and user engagement metrics.
          </Paragraph>
        </YStack>

        {/* Metrics Grid */}
        <YStack space="$4">
          <H3>Key Metrics</H3>
          <XStack space="$4" flexWrap="wrap">
            {analyticsMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </XStack>
        </YStack>

        {/* Chart Placeholder */}
        <YStack space="$4">
          <H3>Traffic Overview</H3>
          <Card padding="$6" backgroundColor="$background" bordered>
            <YStack alignItems="center" justifyContent="center" minHeight={200} space="$3">
              <Activity size={48} color="$color8" />
              <Text fontSize="$4" color="$color11" textAlign="center">
                Chart visualization would go here
              </Text>
              <Text fontSize="$3" color="$color10" textAlign="center">
                Integration with charting library needed
              </Text>
            </YStack>
          </Card>
        </YStack>

        {/* Recent Activity */}
        <YStack space="$4">
          <H3>Recent Activity</H3>
          <Card padding="$4" backgroundColor="$background" bordered>
            <YStack space="$3">
              {[
                { event: 'Traffic spike detected', time: '2 hours ago', type: 'info' },
                { event: 'Conversion goal achieved', time: '4 hours ago', type: 'success' },
                { event: 'Page load time increased', time: '6 hours ago', type: 'warning' },
                { event: 'New traffic source identified', time: '8 hours ago', type: 'info' },
              ].map((activity, index) => (
                <XStack key={index} alignItems="center" space="$3">
                  <YStack
                    width={8}
                    height={8}
                    borderRadius="$10"
                    backgroundColor={
                      activity.type === 'success'
                        ? '$green10'
                        : activity.type === 'warning'
                        ? '$blue7'
                        : '$blue10'
                    }
                  />
                  <YStack flex={1}>
                    <Text fontWeight="500">{activity.event}</Text>
                    <Text fontSize="$2" color="$color11">
                      {activity.time}
                    </Text>
                  </YStack>
                </XStack>
              ))}
            </YStack>
          </Card>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
