import {
  Badge,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  Package,
  Search,
  ShoppingCart,
  Truck
} from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import {
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
interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  orderDate: string;
  shippingAddress: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    total: 299.99,
    status: 'delivered',
    items: 3,
    orderDate: '2023-12-15',
    shippingAddress: '123 Main St, New York, NY',
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    total: 149.50,
    status: 'shipped',
    items: 2,
    orderDate: '2023-12-14',
    shippingAddress: '456 Oak Ave, Los Angeles, CA',
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Johnson',
    customerEmail: 'mike.johnson@example.com',
    total: 89.99,
    status: 'processing',
    items: 1,
    orderDate: '2023-12-13',
    shippingAddress: '789 Pine St, Chicago, IL',
  },
  {
    id: 'ORD-004',
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah.wilson@example.com',
    total: 199.99,
    status: 'pending',
    items: 4,
    orderDate: '2023-12-12',
    shippingAddress: '321 Elm St, Miami, FL',
  },
];

export default function OrdersScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '$green9';
      case 'shipped': return '$blue9';
      case 'processing': return '$blue9';
      case 'pending': return '$yellow9';
      case 'cancelled': return '$red9';
      default: return '$gray9';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'shipped': return Truck;
      case 'processing': return Package;
      case 'pending': return Clock;
      case 'cancelled': return Clock;
      default: return Clock;
    }
  };

  const OrderCard = ({ order }: { order: Order }) => {
    const StatusIcon = getStatusIcon(order.status);
    
    return (
      <Card padding="$4" backgroundColor="$background" bordered>
        <YStack space="$3">
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center" space="$3">
              <Text fontSize="$4" fontWeight="600" color="$blue11">
                {order.id}
              </Text>
              <Badge
                backgroundColor={getStatusColor(order.status)}
                color="white"
                size="$2"
              >
                <XStack alignItems="center" space="$1">
                  <StatusIcon size={12} />
                  <Text color="white" fontSize="$1" fontWeight="600">
                    {order.status.toUpperCase()}
                  </Text>
                </XStack>
              </Badge>
            </XStack>
            <Text fontSize="$5" fontWeight="700" color="$green11">
              ${order.total.toFixed(2)}
            </Text>
          </XStack>

          <YStack space="$2">
            <XStack alignItems="center" space="$2">
              <Text fontSize="$4" fontWeight="500">
                {order.customerName}
              </Text>
              <Text fontSize="$3" color="$color11">
                ({order.customerEmail})
              </Text>
            </XStack>
            
            <XStack alignItems="center" space="$4">
              <XStack alignItems="center" space="$1">
                <Package size={14} color="$color11" />
                <Text fontSize="$3" color="$color11">
                  {order.items} items
                </Text>
              </XStack>
              <XStack alignItems="center" space="$1">
                <Calendar size={14} color="$color11" />
                <Text fontSize="$3" color="$color11">
                  {order.orderDate}
                </Text>
              </XStack>
            </XStack>
            
            <Text fontSize="$3" color="$color10">
              Ship to: {order.shippingAddress}
            </Text>
          </YStack>

          <XStack space="$2" justifyContent="flex-end">
            <Button size="$3" variant="outlined">
              View Details
            </Button>
            <Button size="$3" backgroundColor="$blue9" color="white">
              Update Status
            </Button>
          </XStack>
        </YStack>
      </Card>
    );
  };

  const orderStats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    shipped: mockOrders.filter(o => o.status === 'shipped').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length,
  };

  return (
    <ScrollView flex={1}>
      <YStack padding="$4" space="$6">
        {/* Header */}
        <YStack space="$2">
          <XStack alignItems="center" space="$3">
            <ShoppingCart size={28} color="$color12" />
            <H1>Orders</H1>
          </XStack>
          <Paragraph color="$color11">
            Manage customer orders and track fulfillment status.
          </Paragraph>
        </YStack>

        {/* Order Stats */}
        <YStack space="$3">
          <H3>Order Overview</H3>
          <XStack space="$3" flexWrap="wrap">
            <Card flex={1} padding="$3" backgroundColor="$background" bordered>
              <YStack alignItems="center" space="$1">
                <Text fontSize="$6" fontWeight="700" color="$blue11">
                  {orderStats.total}
                </Text>
                <Text fontSize="$2" color="$color11">
                  Total Orders
                </Text>
              </YStack>
            </Card>
            <Card flex={1} padding="$3" backgroundColor="$background" bordered>
              <YStack alignItems="center" space="$1">
                <Text fontSize="$6" fontWeight="700" color="$blue11">
                  {orderStats.pending + orderStats.processing}
                </Text>
                <Text fontSize="$2" color="$color11">
                  Active
                </Text>
              </YStack>
            </Card>
            <Card flex={1} padding="$3" backgroundColor="$background" bordered>
              <YStack alignItems="center" space="$1">
                <Text fontSize="$6" fontWeight="700" color="$green11">
                  {orderStats.delivered}
                </Text>
                <Text fontSize="$2" color="$color11">
                  Completed
                </Text>
              </YStack>
            </Card>
          </XStack>
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
                placeholder="Search orders..."
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
          <XStack space="$2" flexWrap="wrap">
            {['all', 'pending', 'processing', 'shipped', 'delivered'].map((filter) => (
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

        {/* Orders List */}
        <YStack space="$4">
          <XStack alignItems="center" justifyContent="space-between">
            <H3>Recent Orders ({filteredOrders.length})</H3>
          </XStack>
          
          <YStack space="$3">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
