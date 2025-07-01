import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Edit3,
  Eye,
  Search,
  Trash2,
} from '@tamagui/lucide-icons';
import React, { useMemo, useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Input,
  ScrollView,
  Separator,
  Spinner,
  Text,
  XStack,
  YStack
} from 'tamagui';

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  width?: number;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableData {
  id: string | number;
  [key: string]: any;
}

interface ProTableProps<T extends TableData> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  searchable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onView?: (row: T) => void;
  emptyMessage?: string;
}

type SortDirection = 'asc' | 'desc' | null;

export function ProTable<T extends TableData>({
  data,
  columns,
  loading = false,
  searchable = true,
  selectable = true,
  pagination = true,
  pageSize = 10,
  onEdit,
  onDelete,
  onView,
  emptyMessage = 'No data available',
}: ProTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(prev => 
        prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'
      );
      if (sortDirection === 'desc') {
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(paginatedData.map(row => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: string | number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  const isAllSelected = paginatedData.length > 0 && 
    paginatedData.every(row => selectedRows.has(row.id));

  const SortIcon = ({ column }: { column: keyof T }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp size={14} /> : 
      <ChevronDown size={14} />;
  };

  if (loading) {
    return (
      <Card padding="$6" alignItems="center" justifyContent="center">
        <YStack alignItems="center" space="$3">
          <Spinner size="large" />
          <Text>Loading data...</Text>
        </YStack>
      </Card>
    );
  }

  return (
    <Card backgroundColor="$background" bordered>
      {/* Header with Search and Actions */}
      {(searchable || selectedRows.size > 0) && (
        <YStack padding="$4" space="$3">
          {searchable && (
            <XStack alignItems="center" space="$2">
              <XStack
                flex={1}
                alignItems="center"
                backgroundColor="$backgroundSoft"
                borderRadius="$4"
                paddingHorizontal="$3"
                paddingVertical="$2"
              >
                <Search size={16} color="$color10" />
                <Input
                  flex={1}
                  borderWidth={0}
                  backgroundColor="transparent"
                  placeholder="Search..."
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
              </XStack>
            </XStack>
          )}

          {selectedRows.size > 0 && (
            <XStack alignItems="center" space="$2">
              <Text color="$color11">
                {selectedRows.size} row(s) selected
              </Text>
              <Button size="$2" variant="outlined" theme="red">
                Delete Selected
              </Button>
            </XStack>
          )}
        </YStack>
      )}

      {/* Table */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <YStack width="100%">
          {/* Table Header */}
          <XStack
            backgroundColor="$backgroundSoft"
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
            paddingVertical="$3"
            paddingHorizontal="$4"
          >
            {selectable && (
              <XStack width={50} alignItems="center" justifyContent="center">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                />
              </XStack>
            )}
            
            {columns.map((column) => (
              <XStack
                key={String(column.key)}
                flex={1}
                space="$2"
              >
                {column.sortable ? (
                  <Button
                    size="$2"
                    chromeless
                    justifyContent="flex-start"
                    onPress={() => handleSort(column.key)}
                    icon={<SortIcon column={column.key} />}
                    iconAfter
                  >
                    <Text fontWeight="600" color="$color12">
                      {column.title}
                    </Text>
                  </Button>
                ) : (
                  <Text fontWeight="600" color="$color12">
                    {column.title}
                  </Text>
                )}
              </XStack>
            ))}

            {(onEdit || onDelete || onView) && (
              <XStack width={120} alignItems="center" justifyContent="center">
                <Text fontWeight="600" color="$color12">
                  Actions
                </Text>
              </XStack>
            )}
          </XStack>

          {/* Table Body */}
          {paginatedData.length === 0 ? (
            <YStack padding="$6" alignItems="center">
              <Text color="$color11">{emptyMessage}</Text>
            </YStack>
          ) : (
            paginatedData.map((row, index) => (
              <XStack
                key={row.id}
                borderBottomWidth={1}
                borderBottomColor="$borderColor"
                p="$3"
              >
                {selectable && (
                  <XStack width={50} ai="center" jc="center">
                    <Checkbox
                      checked={selectedRows.has(row.id)}
                      onCheckedChange={(checked) => handleSelectRow(row.id, !!checked)}
                    />
                  </XStack>
                )}

                {columns.map((column) => (
                  <XStack
                    key={String(column.key)}
                    flex={1}
                    ai="center"
                  >
                    {column.render ? (
                      column.render(row[column.key], row)
                    ) : (
                      <Text>{String(row[column.key])}</Text>
                    )}
                  </XStack>
                ))}

                {(onEdit || onDelete || onView) && (
                  <XStack width={120} ai="center" jc="center" space="$1">
                    {onView && (
                      <Button
                        size="$2"
                        chromeless
                        icon={<Eye size={14} />}
                        onPress={() => onView(row)}
                      />
                    )}
                    {onEdit && (
                      <Button
                        size="$2"
                        chromeless
                        icon={<Edit3 size={14} />}
                        onPress={() => onEdit(row)}
                      />
                    )}
                    {onDelete && (
                      <Button
                        size="$2"
                        chromeless
                        theme="red"
                        icon={<Trash2 size={14} />}
                        onPress={() => onDelete(row)}
                      />
                    )}
                  </XStack>
                )}
              </XStack>
            ))
          )}
        </YStack>
      </ScrollView>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <>
          <Separator />
          <XStack
            padding="$4"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text color="$color11" fontSize="$3">
              Showing {((currentPage - 1) * pageSize) + 1} to{' '}
              {Math.min(currentPage * pageSize, sortedData.length)} of{' '}
              {sortedData.length} results
            </Text>

            <XStack alignItems="center" space="$2">
              <Button
                size="$2"
                variant="outlined"
                disabled={currentPage === 1}
                onPress={() => setCurrentPage(prev => prev - 1)}
                icon={<ChevronLeft size={14} />}
              >
                Previous
              </Button>

              <Text color="$color11" fontSize="$3">
                Page {currentPage} of {totalPages}
              </Text>

              <Button
                size="$2"
                variant="outlined"
                disabled={currentPage === totalPages}
                onPress={() => setCurrentPage(prev => prev + 1)}
                iconAfter={<ChevronRight size={14} />}
              >
                Next
              </Button>
            </XStack>
          </XStack>
        </>
      )}
    </Card>
  );
}
