import React, { useMemo } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';

interface PeopleTableProps {
  data: any[];
  loading: boolean;
}

const PeopleTable: React.FC<PeopleTableProps> = ({ data, loading }) => {

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = useTable({ columns, data }, useFilters, useSortBy, usePagination);

  if (loading) {
    return <div>Loading...</div>;
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

export default PeopleTable;