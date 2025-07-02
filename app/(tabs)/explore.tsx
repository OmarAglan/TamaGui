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
    avatar?: string;
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Employee>('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');

  // Icons as text symbols
  const icons = {
    search: '🔍',
    chevronUp: '▲',
    chevronDown: '▼',
    edit: '✏️',
    trash: '🗑️',
    eye: '👁️',
    chevronLeft: '◀',
    chevronRight: '▶',
    download: '📥',
    plus: '➕',
    sort: '↕️',
  };

  // Sample data with avatars
  const sampleData = useMemo((): Employee[] => [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Senior Developer',
      status: 'active',
      joinDate: '2023-01-15',
      department: 'Engineering',
      salary: 75000,
      avatar: '👨‍💼',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Product Manager',
      status: 'active',
      joinDate: '2023-02-20',
      department: 'Product',
      salary: 85000,
      avatar: '👩‍💼',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'Frontend Developer',
      status: 'inactive',
      joinDate: '2023-03-10',
      department: 'Engineering',
      salary: 62000,
      avatar: '👨‍💻',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'UX Designer',
      status: 'active',
      joinDate: '2023-04-05',
      department: 'Design',
      salary: 68000,
      avatar: '👩‍🎨',
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'Data Analyst',
      status: 'pending',
      joinDate: '2023-05-12',
      department: 'Analytics',
      salary: 58000,
      avatar: '👨‍🔬',
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'Marketing Manager',
      status: 'active',
      joinDate: '2023-06-18',
      department: 'Marketing',
      salary: 70000,
      avatar: '👩‍📊',
    },
    {
      id: 7,
      name: 'Robert Chen',
      email: 'robert.chen@example.com',
      role: 'DevOps Engineer',
      status: 'active',
      joinDate: '2023-07-22',
      department: 'Engineering',
      salary: 78000,
      avatar: '👨‍🔧',
    },
    {
      id: 8,
      name: 'Lisa Wang',
      email: 'lisa.wang@example.com',
      role: 'Sales Director',
      status: 'active',
      joinDate: '2023-08-30',
      department: 'Sales',
      salary: 95000,
      avatar: '👩‍💼',
    },
  ], []);

  // Table columns configuration
  const columns = [
    { key: 'name', label: 'Employee', sortable: true, width: 280 },
    { key: 'role', label: 'Role', sortable: true, width: 180 },
    { key: 'department', label: 'Department', sortable: true, width: 140 },
    { key: 'status', label: 'Status', sortable: true, width: 120 },
    { key: 'joinDate', label: 'Join Date', sortable: true, width: 120 },
    { key: 'salary', label: 'Salary', sortable: true, width: 120 },
    { key: 'actions', label: 'Actions', sortable: false, width: 120 },
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

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        // Handle undefined values
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortDirection === 'asc' ? -1 : 1;
        if (bValue == null) return sortDirection === 'asc' ? 1 : -1;

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
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; backgroundColor: string }> = {
      active: { color: '#10B981', backgroundColor: '#ECFDF5' },
      inactive: { color: '#EF4444', backgroundColor: '#FEF2F2' },
      pending: { color: '#F59E0B', backgroundColor: '#FFFBEB' },
    };

    const config = statusConfig[status] || statusConfig.active;

    return (
      <XStack
        backgroundColor={config.backgroundColor}
        paddingHorizontal="$2.5"
        paddingVertical="$1.5"
        borderRadius="$4"
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor={config.color + '20'}
      >
        <Text fontSize="$2" color={config.color} fontWeight="600">
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <YStack flex={1} backgroundColor="$blue1" padding="$4" space="$4">
      {/* Header */}
      <XStack justifyContent="space-between" alignItems="center">
        <YStack>
          <H3 color="$blue12" fontWeight="700" fontSize="$7">
            Employee Management
          </H3>
          <Paragraph color="$blue10" fontSize="$4" marginTop="$1">
            Manage and view employee information
          </Paragraph>
        </YStack>
        <XStack space="$2">
          <Button
            backgroundColor="$blue11"
            color="white"
            borderRadius="$3"
            paddingHorizontal="$4"
            paddingVertical="$2.5"
            fontSize="$3"
            fontWeight="500"
            onPress={() => console.log('Export data')}
            pressStyle={{ backgroundColor: '$blue12' }}
          >
            <XStack alignItems="center" space="$2">
              <Text fontSize="$3">{icons.download}</Text>
              <Text color="white" fontSize="$3">Export</Text>
            </XStack>
          </Button>
          <Button
            backgroundColor="$blue10"
            color="white"
            borderRadius="$3"
            paddingHorizontal="$4"
            paddingVertical="$2.5"
            fontSize="$3"
            fontWeight="500"
            onPress={() => console.log('Add new')}
            pressStyle={{ backgroundColor: '$blue11' }}
          >
            <XStack alignItems="center" space="$2">
              <Text fontSize="$3">{icons.plus}</Text>
              <Text color="white" fontSize="$3">Add New</Text>
            </XStack>
          </Button>
        </XStack>
      </XStack>

      {/* Filters and Search */}
      <Card
        padding="$4"
        backgroundColor="white"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$blue4"
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.1}
        shadowRadius={3}
      >
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          {/* Search */}
          <XStack
            flex={1}
            minWidth="$20"
            alignItems="center"
            backgroundColor="$blue2"
            borderRadius="$3"
            paddingHorizontal="$3"
            paddingVertical="$2"
            borderWidth={1}
            borderColor="$blue5"
            focusStyle={{ borderColor: '$blue8' }}
          >
            <Text fontSize="$4" paddingRight="$2" color="$blue9">{icons.search}</Text>
            <Input
              flex={1}
              placeholder="Search employees..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              borderWidth={0}
              backgroundColor="transparent"
              fontSize="$3"
              color="$blue12"
              placeholderTextColor="$blue9"
            />
          </XStack>

          {/* Status Filter */}
          <XStack
            ai="center"
            backgroundColor="$blue2"
            borderRadius="$3"
            paddingHorizontal="$3"
            paddingVertical="$2.5"
            minWidth="$12"
            borderWidth={1}
            borderColor="$blue5"
          >
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
              <Text fontSize="$3" color="$blue11" fontWeight="500">
                Status: {statusFilter === 'all' ? 'All' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              </Text>
            </Button>
          </XStack>

          {/* Items per page */}
          <XStack
            alignItems="center"
            backgroundColor="$blue2"
            borderRadius="$3"
            paddingHorizontal="$3"
            paddingVertical="$2.5"
            minWidth="$8"
            borderWidth={1}
            borderColor="$blue5"
          >
            <Button
              chromeless
              onPress={() => {
                const options = [5, 10, 25, 50];
                const currentIndex = options.indexOf(itemsPerPage);
                const nextIndex = (currentIndex + 1) % options.length;
                setItemsPerPage(options[nextIndex]);
                setCurrentPage(1);
              }}
              flex={1}
            >
              <Text fontSize="$3" color="$blue11" fontWeight="500">
                Show: {itemsPerPage}
              </Text>
            </Button>
          </XStack>
        </XStack>
      </Card>

      {/* Table */}
      <Card
        flex={1}
        backgroundColor="white"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$blue4"
        overflow="hidden"
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={8}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <YStack minWidth="100%">
            {/* Table Header */}
            <XStack
              backgroundColor="$blue3"
              borderBottomWidth={1}
              borderBottomColor="$blue5"
              paddingVertical="$3"
            >
              {columns.map((column) => (
                <XStack
                  key={column.key}
                  width={column.width}
                  paddingHorizontal="$4"
                  alignItems="center"
                  justifyContent={column.key === 'actions' ? 'center' : 'flex-start'}
                  pressStyle={{ backgroundColor: '$blue4' }}
                  onPress={column.sortable ? () => handleSort(column.key as keyof Employee) : undefined}
                  cursor={column.sortable ? 'pointer' : 'default'}
                >
                  <Text fontSize="$3" fontWeight="600" color="$blue11" letterSpacing={0.5}>
                    {column.label}
                  </Text>
                  {column.sortable && (
                    <Text fontSize="$2" paddingLeft="$2" color="$blue9">
                      {sortField === column.key ? (
                        sortDirection === 'asc' ? icons.chevronUp : icons.chevronDown
                      ) : (
                        icons.sort
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
                backgroundColor={index % 2 === 0 ? 'white' : '$blue1'}
                borderBottomWidth={1}
                borderBottomColor="$blue3"
                paddingVertical="$3"
                pressStyle={{ backgroundColor: '$blue2' }}
                hoverStyle={{ backgroundColor: '$blue2' }}
              >
                {/* Employee (Name + Avatar) */}
                <XStack width={280} paddingHorizontal="$4" alignItems="center" space="$3">
                  <XStack
                    width="$3"
                    height="$3"
                    borderRadius="$10"
                    backgroundColor="$blue3"
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={1}
                    borderColor="$blue5"
                  >
                    <Text fontSize="$4">{item.avatar}</Text>
                  </XStack>
                  <YStack flex={1}>
                    <Text fontSize="$3" color="$blue12" fontWeight="600" numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text fontSize="$2" color="$blue9" numberOfLines={1} marginTop="$0.5">
                      {item.email}
                    </Text>
                  </YStack>
                </XStack>

                {/* Role */}
                <XStack width={180} paddingHorizontal="$4" alignItems="center">
                  <Text fontSize="$3" color="$blue11" fontWeight="500">
                    {item.role}
                  </Text>
                </XStack>

                {/* Department */}
                <XStack width={140} paddingHorizontal="$4" alignItems="center">
                  <Text fontSize="$3" color="$blue10">
                    {item.department}
                  </Text>
                </XStack>

                {/* Status */}
                <XStack width={120} paddingHorizontal="$4" alignItems="center">
                  {getStatusBadge(item.status)}
                </XStack>

                {/* Join Date */}
                <XStack width={120} paddingHorizontal="$4" alignItems="center">
                  <Text fontSize="$3" color="$blue10">
                    {formatDate(item.joinDate)}
                  </Text>
                </XStack>

                {/* Salary */}
                <XStack width={120} paddingHorizontal="$4" alignItems="center">
                  <Text fontSize="$3" color="$blue12" fontWeight="600">
                    {formatSalary(item.salary)}
                  </Text>
                </XStack>

                {/* Actions */}
                <XStack width={120} paddingHorizontal="$4" alignItems="center" justifyContent="center">
                  <XStack space="$1">
                    <Button
                      size="$2.5"
                      chromeless
                      onPress={() => handleAction('view', item)}
                      borderRadius="$2"
                      backgroundColor="$blue2"
                      pressStyle={{ backgroundColor: '$blue4' }}
                      padding="$1.5"
                    >
                      <Text fontSize="$2" color="$blue10">{icons.eye}</Text>
                    </Button>
                    <Button
                      size="$2.5"
                      chromeless
                      onPress={() => handleAction('edit', item)}
                      borderRadius="$2"
                      backgroundColor="$green2"
                      pressStyle={{ backgroundColor: '$green4' }}
                      padding="$1.5"
                    >
                      <Text fontSize="$2" color="$green10">{icons.edit}</Text>
                    </Button>
                    <Button
                      size="$2.5"
                      chromeless
                      onPress={() => handleAction('delete', item)}
                      borderRadius="$2"
                      backgroundColor="$red2"
                      pressStyle={{ backgroundColor: '$red4' }}
                      padding="$1.5"
                    >
                      <Text fontSize="$2" color="$red10">{icons.trash}</Text>
                    </Button>
                  </XStack>
                </XStack>
              </XStack>
            ))}

            {/* Empty State */}
            {paginatedData.length === 0 && (
              <YStack padding="$8" alignItems="center" space="$2">
                <Text fontSize="$6" opacity={0.3}>📋</Text>
                <Text fontSize="$4" color="$blue10" fontWeight="500">No employees found</Text>
                <Text fontSize="$3" color="$blue8">Try adjusting your search or filter criteria</Text>
              </YStack>
            )}
          </YStack>
        </ScrollView>
      </Card>

      {/* Pagination */}
      <Card
        padding="$4"
        backgroundColor="white"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$blue4"
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.1}
        shadowRadius={3}
      >
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$3" color="$blue10">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} entries
          </Text>

          <XStack space="$1" alignItems="center">
            <Button
              size="$3"
              chromeless
              onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              opacity={currentPage === 1 ? 0.5 : 1}
              padding="$2"
              borderRadius="$2"
              backgroundColor="$blue3"
              pressStyle={{ backgroundColor: '$blue5' }}
            >
              <Text fontSize="$3" color="$blue11">{icons.chevronLeft}</Text>
            </Button>

            <XStack space="$1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return pageNum;
              }).map((page) => (
                <Button
                  key={page}
                  size="$3"
                  backgroundColor={currentPage === page ? '$blue10' : '$blue3'}
                  color={currentPage === page ? 'white' : '$blue11'}
                  borderRadius="$2"
                  paddingHorizontal="$3"
                  onPress={() => setCurrentPage(page)}
                  pressStyle={{
                    backgroundColor: currentPage === page ? '$blue11' : '$blue5'
                  }}
                >
                  <Text
                    color={currentPage === page ? 'white' : '$blue11'}
                    fontWeight={currentPage === page ? '600' : '500'}
                  >
                    {page}
                  </Text>
                </Button>
              ))}
            </XStack>

            <Button
              size="$3"
              chromeless
              onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              opacity={currentPage === totalPages ? 0.5 : 1}
              padding="$2"
              borderRadius="$2"
              backgroundColor="$blue3"
              pressStyle={{ background: '$blue5' }}
            >
              <Text fontSize="$3" color="$blue11">{icons.chevronRight}</Text>
            </Button>
          </XStack>
        </XStack>
      </Card>
    </YStack>
  );
};

export default ProfessionalTable;