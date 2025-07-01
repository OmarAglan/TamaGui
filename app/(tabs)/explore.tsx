import React, { useMemo, useState } from 'react';
import {
  Button,
  Card,
  H3,
  Input,
  Paragraph,
  ScrollView,
  Text,
  XStack,
  YStack
} from 'tamagui';
// Alternative import if using tamagui config
// import { YStack, XStack, Text, Input, Button, Card, H3, Paragraph, ScrollView } from 'tamagui';

const ProfessionalTable = () => {
  interface Employee {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    joinDate: string;
    department: string;
    salary: number;
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Employee>('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');

  // Icons as text symbols (fallback if lucide icons not available)
  const icons = {
    search: '🔍',
    chevronUp: '▲',
    chevronDown: '▼',
    edit: '✏️',
    trash: '🗑️',
    eye: '👁️',
    chevronLeft: '◀',
    chevronRight: '▶',
    download: '⬇️',
    plus: '➕',
  };

  // Sample data - replace with your actual data
  const sampleData: Employee[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'active',
      joinDate: '2023-01-15',
      department: 'Engineering',
      salary: 75000,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Manager',
      status: 'active',
      joinDate: '2023-02-20',
      department: 'Marketing',
      salary: 68000,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'Developer',
      status: 'inactive',
      joinDate: '2023-03-10',
      department: 'Engineering',
      salary: 62000,
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'Designer',
      status: 'active',
      joinDate: '2023-04-05',
      department: 'Design',
      salary: 58000,
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'Analyst',
      status: 'pending',
      joinDate: '2023-05-12',
      department: 'Finance',
      salary: 55000,
    },
  ];

  // Table columns configuration
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'joinDate', label: 'Join Date', sortable: true },
    { key: 'salary', label: 'Salary', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ];

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = sampleData.filter(item => {
      const matchesSearch = Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];
        
        // Handle different data types
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [sampleData, searchTerm, sortField, sortDirection, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAction = (action: 'view' | 'edit' | 'delete', item: Employee) => {
    console.log(`${action} action for:`, item);
    // Implement your action logic here
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; backgroundColor: string }> = {
      active: { color: '$green10', backgroundColor: '$green3' },
      inactive: { color: '$red10', backgroundColor: '$red3' },
      pending: { color: '$blue1', backgroundColor: '$blue1' },
    };
    
    const config = statusConfig[status] || statusConfig.active;
    
    return (
      <XStack
        backgroundColor={config.backgroundColor}
        paddingHorizontal="$2"
        paddingVertical="$1"
        borderRadius="$2"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="$2" color={config.color} fontWeight="500">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </XStack>
    );
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" space="$4">
        {/* Header */}
        <XStack justifyContent="space-between" alignItems="center">
          <YStack>
            <H3 color="$color" fontWeight="bold">
              Employee Management
            </H3>
            <Paragraph color="$color11" fontSize="$3">
              Manage and view employee information
            </Paragraph>
          </YStack>
          <XStack space="$2">
            <Button
              backgroundColor="$blue9"
              color="white"
              borderRadius="$3"
              paddingHorizontal="$3"
              paddingVertical="$2"
              onPress={() => console.log('Export data')}
            >
              <XStack alignItems="center" space="$1">
                <Text fontSize="$2">{icons.download}</Text>
                <Text color="white" fontSize="$3">Export</Text>
              </XStack>
            </Button>
            <Button
              backgroundColor="$green9"
              color="white"
              borderRadius="$3"
              paddingHorizontal="$3"
              paddingVertical="$2"
              onPress={() => console.log('Add new')}
            >
              <XStack alignItems="center" space="$1">
                <Text fontSize="$2">{icons.plus}</Text>
                <Text color="white" fontSize="$3">Add New</Text>
              </XStack>
            </Button>
          </XStack>
        </XStack>

        {/* Filters and Search */}
        <Card padding="$3" backgroundColor="$background" borderRadius="$3" borderWidth={1} borderColor="$borderColor">
          <XStack space="$3" alignItems="center" flexWrap="wrap">
            {/* Search */}
            <XStack flex={1} minWidth={200} alignItems="center" borderWidth={1} borderColor="$borderColor" borderRadius="$3" paddingHorizontal="$2">
              <Text fontSize="$3" paddingRight="$2">{icons.search}</Text>
              <Input
                flex={1}
                placeholder="Search employees..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                borderWidth={0}
                backgroundColor="transparent"
                paddingHorizontal="$2"
                fontSize="$3"
              />
            </XStack>

            {/* Status Filter */}
            <XStack alignItems="center" borderWidth={1} borderColor="$borderColor" borderRadius="$3" paddingHorizontal="$3" paddingVertical="$2" minWidth={150}>
              <Button
                chromeless
                onPress={() => {
                  const statuses = ['all', 'active', 'inactive', 'pending'];
                  const currentIndex = statuses.indexOf(statusFilter);
                  const nextIndex = (currentIndex + 1) % statuses.length;
                  setStatusFilter(statuses[nextIndex]);
                }}
                flex={1}
              >
                <Text fontSize="$3" color="$color">
                  Status: {statusFilter === 'all' ? 'All' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                </Text>
              </Button>
            </XStack>

            {/* Items per page */}
            <XStack alignItems="center" borderWidth={1} borderColor="$borderColor" borderRadius="$3" paddingHorizontal="$3" paddingVertical="$2" minWidth={100}>
              <Button
                chromeless
                onPress={() => {
                  const options = [5, 10, 25, 50];
                  const currentIndex = options.indexOf(itemsPerPage);
                  const nextIndex = (currentIndex + 1) % options.length;
                  setItemsPerPage(options[nextIndex]);
                }}
                flex={1}
              >
                <Text fontSize="$3" color="$color">
                  {itemsPerPage}
                </Text>
              </Button>
            </XStack>
          </XStack>
        </Card>

        {/* Table */}
        <Card flex={1} backgroundColor="$background" borderRadius="$3" borderWidth={1} borderColor="$borderColor" overflow="hidden">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <YStack minWidth="100%">
              {/* Table Header */}
              <XStack backgroundColor="$gray2" borderBottomWidth={1} borderBottomColor="$borderColor">
                {columns.map((column) => (
                  <XStack
                    key={column.key}
                    flex={column.key === 'actions' ? 0 : 1}
                    width={column.key === 'actions' ? 120 : undefined}
                    minWidth={column.key === 'email' ? 200 : 120}
                    paddingHorizontal="$3"
                    paddingVertical="$3"
                    alignItems="center"
                    justifyContent="space-between"
                    pressStyle={{ backgroundColor: '$gray3' }}
                    onPress={column.sortable ? () => handleSort(column.key as keyof Employee) : undefined}
                  >
                    <Text fontSize="$3" fontWeight="600" color="$color">
                      {column.label}
                    </Text>
                    {column.sortable && (
                      <Text fontSize="$2" paddingLeft="$1">
                        {sortField === column.key ? (
                          sortDirection === 'asc' ? icons.chevronUp : icons.chevronDown
                        ) : (
                          '↕️'
                        )}
                      </Text>
                    )}
                  </XStack>
                ))}
              </XStack>

              {/* Table Body */}
              {paginatedData.map((item, index) => (
                <XStack
                  key={item.id}
                  backgroundColor={index % 2 === 0 ? '$background' : '$gray1'}
                  borderBottomWidth={1}
                  borderBottomColor="$borderColor"
                  pressStyle={{ backgroundColor: '$gray2' }}
                >
                  <XStack flex={1} minWidth={120} paddingHorizontal="$3" paddingVertical="$3" alignItems="center">
                    <Text fontSize="$3" color="$color" fontWeight="500">
                      {item.name}
                    </Text>
                  </XStack>
                  <XStack flex={1} minWidth={200} paddingHorizontal="$3" paddingVertical="$3" alignItems="center">
                    <Text fontSize="$3" color="$color11">
                      {item.email}
                    </Text>
                  </XStack>
                  <XStack flex={1} minWidth={120} paddingHorizontal="$3" paddingVertical="$3" alignItems="center">
                    <Text fontSize="$3" color="$color">
                      {item.role}
                    </Text>
                  </XStack>
                  <XStack flex={1} minWidth={120} paddingHorizontal="$3" paddingVertical="$3" alignItems="center">
                    <Text fontSize="$3" color="$color">
                      {item.department}
                    </Text>
                  </XStack>
                  <XStack flex={1} minWidth={120} paddingHorizontal="$3" paddingVertical="$3" alignItems="center">
                    {getStatusBadge(item.status)}
                  </XStack>
                  <XStack flex={1} minWidth={120} paddingHorizontal="$3" paddingVertical="$3" alignItems="center">
                    <Text fontSize="$3" color="$color">
                      {new Date(item.joinDate).toLocaleDateString()}
                    </Text>
                  </XStack>
                  <XStack flex={1} minWidth={120} paddingHorizontal="$3" paddingVertical="$3" alignItems="center">
                    <Text fontSize="$3" color="$color" fontWeight="500">
                      {formatSalary(item.salary)}
                    </Text>
                  </XStack>
                  <XStack width={120} paddingHorizontal="$3" paddingVertical="$3" alignItems="center" justifyContent="center">
                    <XStack space="$1">
                      <Button
                        chromeless
                        size="$2"
                        onPress={() => handleAction('view', item)}
                        borderRadius="$2"
                        padding="$1"
                        backgroundColor="$blue2"
                      >
                        <Text fontSize="$2">{icons.eye}</Text>
                      </Button>
                      <Button
                        chromeless
                        size="$2"
                        onPress={() => handleAction('edit', item)}
                        borderRadius="$2"
                        padding="$1"
                        backgroundColor="$green2"
                      >
                        <Text fontSize="$2">{icons.edit}</Text>
                      </Button>
                      <Button
                        chromeless
                        size="$2"
                        onPress={() => handleAction('delete', item)}
                        borderRadius="$2"
                        padding="$1"
                        backgroundColor="$red2"
                      >
                        <Text fontSize="$2">{icons.trash}</Text>
                      </Button>
                    </XStack>
                  </XStack>
                </XStack>
              ))}
            </YStack>
          </ScrollView>
        </Card>

        {/* Pagination */}
        <Card padding="$3" backgroundColor="$background" borderRadius="$3" borderWidth={1} borderColor="$borderColor">
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$3" color="$color11">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} entries
            </Text>
            
            <XStack space="$2" alignItems="center">
              <Button
                chromeless
                size="$3"
                onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                opacity={currentPage === 1 ? 0.5 : 1}
                padding="$2"
              >
                <Text fontSize="$3">{icons.chevronLeft}</Text>
              </Button>
              
              <XStack space="$1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    size="$3"
                    backgroundColor={currentPage === page ? '$blue9' : 'transparent'}
                    color={currentPage === page ? 'white' : '$color'}
                    borderRadius="$2"
                    paddingHorizontal="$2"
                    onPress={() => setCurrentPage(page)}
                  >
                    <Text color={currentPage === page ? 'white' : '$color'}>{page}</Text>
                  </Button>
                ))}
              </XStack>
              
              <Button
                chromeless
                size="$3"
                onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                opacity={currentPage === totalPages ? 0.5 : 1}
                padding="$2"
              >
                <Text fontSize="$3">{icons.chevronRight}</Text>
              </Button>
            </XStack>
          </XStack>
        </Card>
      </YStack>
    );
  };

  export default ProfessionalTable;
