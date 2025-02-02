import React, { useState } from 'react';
import { useTable, Column } from 'react-table';
import { useColumns, useSortedData, usePaginatedSortedData, handleSort } from '../utils/Utils';

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

interface Data {
  people?: Person[];
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
  
  const itemsPerPage = 10;

  const columns: Column<Person>[] = useColumns();

  const sortedData = useSortedData(data.people || [], sortBy);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedSortedData = usePaginatedSortedData(sortedData, currentPage, itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: paginatedSortedData });

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
                  onClick={() => handleSort(setSortBy, column.id)}
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
      <div>
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