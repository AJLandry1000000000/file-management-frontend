import React, { useMemo } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';

interface DataTableProps {
  data: {
    people?: any[];
    pagy?: {
      vars: {
        items: number;
        count: number;
        page: number;
      };
      count: number;
      page: number;
      prev: number | null;
      next: number | null;
    } | {};
  } | null;
  loading: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ data, loading }) => {
  const columns = useMemo(
    () => [
      { Header: 'First Name', accessor: 'first_name' },
      { Header: 'Last Name', accessor: 'last_name' },
      { Header: 'Species', accessor: 'species' },
      { Header: 'Gender', accessor: 'gender' },
      { Header: 'Weapon', accessor: 'weapon' },
      { Header: 'Vehicle', accessor: 'vehicle' },
    ],
    []
  );

  const tableData = useMemo(() => (data && data.people ? data.people : []), [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = useTable({ columns, data: tableData }, useSortBy, usePagination);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.people || data.people.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;