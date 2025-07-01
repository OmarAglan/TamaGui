import {
  Filter,
  Mail,
  MapPin,
  MoreHorizontal,
  Search,
  UserPlus,
  Users
} from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  H1,
  H3,
  Input,
  Paragraph,
  ScrollView,
  Text,
  XStack,
  YStack,
} from 'tamagui';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
  location: string;
  joinDate: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    location: 'New York, NY',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    location: 'Los Angeles, CA',
    joinDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'User',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    location: 'Chicago, IL',
    joinDate: '2023-03-10',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'User',
    status: 'inactive',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    location: 'Miami, FL',
    joinDate: '2023-01-30',
  },
];

export default function UsersScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '$green9';
      case 'inactive': return '$red9';
      case 'pending': return '$orange9';
      default: return '$gray9';
    }
  };

  const UserCard = ({ user }: { user: User }) => (
    <Card padding="$4" backgroundColor="$background" bordered>
      <XStack space="$4" alignItems="center">
        <Avatar circular size="$5">
          <Avatar.Image src={user.avatar} />
          <Avatar.Fallback backgroundColor="$blue10">
            <Text color="white" fontSize="$4" fontWeight="600">
              {user.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </Avatar.Fallback>
        </Avatar>
        
        <YStack flex={1} space="$2">
          <XStack alignItems="center" space="$2">
            <Text fontSize="$4" fontWeight="600">
              {user.name}
            </Text>
            <Badge
              backgroundColor={getStatusColor(user.status)}
              color="white"
              size="$2"
            >
              {user.status}
            </Badge>
          </XStack>
          
          <XStack alignItems="center" space="$2">
            <Mail size={14} color="$color11" />
            <Text fontSize="$3" color="$color11">
              {user.email}
            </Text>
          </XStack>
          
          <XStack alignItems="center" space="$2">
            <MapPin size={14} color="$color11" />
            <Text fontSize="$3" color="$color11">
              {user.location}
            </Text>
          </XStack>
          
          <Text fontSize="$2" color="$color10">
            Role: {user.role} • Joined {user.joinDate}
          </Text>
        </YStack>
        
        <Button size="$3" chromeless>
          <MoreHorizontal size={20} />
        </Button>
      </XStack>
    </Card>
  );

  return (
    <ScrollView flex={1}>
      <YStack padding="$4" space="$6">
        {/* Header */}
        <YStack space="$2">
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center" space="$3">
              <Users size={28} color="$color12" />
              <H1>Users</H1>
            </XStack>
            <Button
              backgroundColor="$blue9"
              color="white"
              borderRadius="$3"
              paddingHorizontal="$4"
              paddingVertical="$2"
            >
              <XStack alignItems="center" space="$2">
                <UserPlus size={16} />
                <Text color="white" fontSize="$3" fontWeight="600">
                  Add User
                </Text>
              </XStack>
            </Button>
          </XStack>
          <Paragraph color="$color11">
            Manage user accounts, roles, and permissions.
          </Paragraph>
        </YStack>

        {/* Search and Filters */}
        <YStack space="$3">
          <XStack space="$3" alignItems="center">
            <XStack
              flex={1}
              alignItems="center"
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$3"
              backgroundColor="$background"
              paddingHorizontal="$3"
              paddingVertical="$2"
            >
              <Search size={20} color="$color11" />
              <Input
                flex={1}
                placeholder="Search users..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                borderWidth={0}
                backgroundColor="transparent"
                paddingHorizontal="$2"
              />
            </XStack>
            <Button
              backgroundColor="$background"
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$3"
              paddingHorizontal="$3"
              paddingVertical="$2"
            >
              <XStack alignItems="center" space="$2">
                <Filter size={16} />
                <Text fontSize="$3">Filter</Text>
              </XStack>
            </Button>
          </XStack>

          {/* Filter Buttons */}
          <XStack space="$2">
            {['all', 'active', 'inactive', 'pending'].map((filter) => (
              <Button
                key={filter}
                size="$3"
                backgroundColor={selectedFilter === filter ? '$blue4' : 'transparent'}
                borderColor={selectedFilter === filter ? '$blue8' : '$borderColor'}
                borderWidth={1}
                color={selectedFilter === filter ? '$blue11' : '$color11'}
                onPress={() => setSelectedFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </XStack>
        </YStack>

        {/* Users List */}
        <YStack space="$4">
          <XStack alignItems="center" justifyContent="space-between">
            <H3>All Users ({filteredUsers.length})</H3>
          </XStack>
          
          <YStack space="$3">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
