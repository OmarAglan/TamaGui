import {
    Activity,
    BarChart3,
    Bell,
    DollarSign,
    Home,
    LogOut,
    Menu,
    Settings,
    ShoppingCart,
    TrendingUp,
    Users,
} from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Card,
    H1,
    H2,
    H3,
    Paragraph,
    ScrollView,
    Separator,
    Sheet,
    Text,
    XStack,
    YStack,
} from 'tamagui';

interface DashboardStats {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

const stats: DashboardStats[] = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
    color: '$green10',
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+180.1%',
    trend: 'up',
    icon: Users,
    color: '$blue10',
  },
  {
    title: 'Sales',
    value: '+12,234',
    change: '+19%',
    trend: 'up',
    icon: ShoppingCart,
    color: '$purple10',
  },
  {
    title: 'Active Now',
    value: '573',
    change: '+201',
    trend: 'up',
    icon: Activity,
    color: '$orange10',
  },
];

const sidebarItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: Users, label: 'Users', active: false },
  { icon: ShoppingCart, label: 'Orders', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

// Sample data for the table
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2024-01-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-13' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
];

const userColumns: TableColumn<User>[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email', sortable: true },
  { key: 'role', title: 'Role', sortable: true },
  {
    key: 'status',
    title: 'Status',
    sortable: true,
    render: (value) => (
      <Text
        color={value === 'Active' ? '$green10' : '$red10'}
        fontWeight="600"
      >
        {value}
      </Text>
    )
  },
  { key: 'lastLogin', title: 'Last Login', sortable: true },
];

export default function DashboardScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // In real app, clear auth state
    router.push('/login');
  };

  const StatCard = ({ stat }: { stat: DashboardStats }) => (
    <Card flex={1} padding="$4" backgroundColor="$background" bordered>
      <XStack justifyContent="space-between" alignItems="flex-start">
        <YStack space="$1" flex={1}>
          <Text fontSize="$3" color="$color11">
            {stat.title}
          </Text>
          <H2 fontSize="$7" fontWeight="700">
            {stat.value}
          </H2>
          <XStack alignItems="center" space="$1">
            <TrendingUp size={12} color={stat.color} />
            <Text fontSize="$2" color={stat.color}>
              {stat.change} from last month
            </Text>
          </XStack>
        </YStack>
        <YStack
          backgroundColor={`${stat.color}15`}
          padding="$2"
          borderRadius="$3"
          alignItems="center"
          justifyContent="center"
        >
          <stat.icon size={20} color={stat.color} />
        </YStack>
      </XStack>
    </Card>
  );

  const Sidebar = () => (
    <YStack
      width={250}
      backgroundColor="$background"
      borderRightWidth={1}
      borderRightColor="$borderColor"
      padding="$4"
      space="$2"
      height="100%"
    >
      <YStack space="$4" marginBottom="$6">
        <H2 color="$color12">Dashboard</H2>
        <Separator />
      </YStack>

      <YStack space="$1" flex={1}>
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            size="$3"
            justifyContent="flex-start"
            backgroundColor={item.active ? '$blue4' : 'transparent'}
            borderColor={item.active ? '$blue8' : 'transparent'}
            borderWidth={1}
            color={item.active ? '$blue11' : '$color11'}
            icon={<item.icon size={16} />}
            fontWeight={item.active ? '600' : '400'}
          >
            {item.label}
          </Button>
        ))}
      </YStack>

      <Separator marginVertical="$4" />

      <Button
        size="$3"
        justifyContent="flex-start"
        backgroundColor="transparent"
        color="$red10"
        icon={<LogOut size={16} />}
        onPress={handleLogout}
      >
        Logout
      </Button>
    </YStack>
  );

  const Header = () => (
    <XStack
      backgroundColor="$background"
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
      padding="$4"
      alignItems="center"
      justifyContent="space-between"
    >
      <XStack alignItems="center" space="$3">
        <Button
          size="$3"
          chromeless
          icon={<Menu size={20} />}
          onPress={() => setSidebarOpen(true)}
          display="flex"
          $gtSm={{ display: 'none' }}
        />
        <H1 fontSize="$6">Dashboard</H1>
      </XStack>

      <XStack alignItems="center" space="$3">
        <Button size="$3" chromeless icon={<Bell size={20} />} />
        <Avatar circular size="$3">
          <Avatar.Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
      </XStack>
    </XStack>
  );

  return (
    <YStack flex={1} backgroundColor="$backgroundSoft">
      <Header />
      
      <XStack flex={1}>
        {/* Desktop Sidebar */}
        <YStack display="none" $gtSm={{ display: 'flex' }}>
          <Sidebar />
        </YStack>

        {/* Mobile Sidebar Sheet */}
        <Sheet
          modal
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
          snapPointsMode="fit"
          dismissOnSnapToBottom
        >
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sidebar />
          </Sheet.Frame>
        </Sheet>

        {/* Main Content */}
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

            {/* Users Table */}
            <YStack space="$4">
              <H3>Recent Users</H3>
              <ProTable
                data={sampleUsers}
                columns={userColumns}
                onEdit={(user) => console.log('Edit user:', user)}
                onDelete={(user) => console.log('Delete user:', user)}
                onView={(user) => console.log('View user:', user)}
                pageSize={5}
              />
            </YStack>
          </YStack>
        </ScrollView>
      </XStack>
    </YStack>
  );
}
