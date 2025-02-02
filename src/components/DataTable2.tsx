import React, { useState } from 'react';
import { useTable, Column } from 'react-table';

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

interface PageData {
  vars: {
    items: number;
    count: number;
    page: number;
  };
  count: number;
  page: number;
  prev: number | null;
  next: number | null;
}

interface Data {
  people?: Person[];
  pagy?: PageData;
}

interface DataTableProps {
  data: Data;
  loading: boolean;
}

const DataTable2: React.FC<DataTableProps> = ({ data, loading }) => {
  const [sortBy, setSortBy] = useState<{ column: string; direction: 'asc' | 'desc' }>({
    column: 'first_name',
    direction: 'asc',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const columns: Column<Person>[] = React.useMemo(
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

  const sortedData = React.useMemo(() => {
    if (!data.people) return [];

    return [...data.people].sort((a, b) => {
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
  }, [data.people, sortBy]);

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: paginatedData });

  const handleSort = (column: string) => {
    setSortBy(prev => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.people || data.people.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <table {...getTableProps()} className='table'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  key={column.getHeaderProps().key}
                  onClick={() => handleSort(column.id)}
                  className='table-header'
                >
                  {column.render('Header')}
                  <span>
                    {sortBy.column === column.id
                      ? sortBy.direction === 'asc'
                        ? ' ⬆️'
                        : ' ⬇️'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={cell.getCellProps().key}
                      className='table-cell'
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='pagination'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='pagination-button'
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='pagination-button'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable2;