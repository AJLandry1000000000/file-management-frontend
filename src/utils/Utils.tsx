import React from 'react';
import { Column } from 'react-table';

interface Person {
  id: number;
  first_name: string;
  last_name: string | null;
  species: string;
  gender: string;
  weapon: string | null;
  vehicle: string | null;
  created_at: string;
  updated_at: string;
}

export const useColumns = (): Column<Person>[] => {
  return React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'Species',
        accessor: 'species',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Weapon',
        accessor: 'weapon',
      },
      {
        Header: 'Vehicle',
        accessor: 'vehicle',
      },
    ],
    []
  );
};

export const useSortedData = (data: Person[], sortBy: { column: string; direction: 'asc' | 'desc' }) => {
  return React.useMemo(() => {
    if (!data) return [];

    return [...data].sort((a, b) => {
      const aValue = a[sortBy.column as keyof Person];
      const bValue = b[sortBy.column as keyof Person];
      if (aValue === bValue || (!aValue && !bValue)) return 0;
      if (sortBy.direction === 'asc') {
        if (aValue === null) return -1;
        if (bValue === null) return 1;
        return aValue < bValue ? -1 : 1;
      } else {
        if (aValue === null) return 1;
        if (bValue === null) return -1;
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [data, sortBy]);
};

export const usePaginatedSortedData = (sortedData: Person[], currentPage: number, itemsPerPage: number) => {
    return React.useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage]);
};

export const handleSort = (setSortBy: React.Dispatch<React.SetStateAction<{ column: string; direction: 'asc' | 'desc' }>>, column: string) => {
  setSortBy(prev => ({
    column,
    direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
  }));
};

