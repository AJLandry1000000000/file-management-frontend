import React from 'react';
import { useTable } from 'react-table';

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
  pagy?: {
    count: number;
    page: number;
    // Add other pagy properties as needed
  };
}

interface DataTableProps {
  data: Data;
  loading: boolean;
}

const DataTable2: React.FC<DataTableProps> = ({ data, loading }) => {
    if (loading) {
        return <div>Loading...</div>;
	}

    if (!data || !data.people || data.people.length === 0) {
        return <div>No data available</div>;
    }
  	// Step 3: Define columns
  	const columns = React.useMemo(
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
		], []
	);

  // Step 4: Use the useTable Hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: data.people });

  // Step 5: Render the UI for your table
  return (
    <table {...getTableProps()} style={{ border: '1px solid black', width: '100%' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: '1px solid black',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: '1px solid black',
                    }}
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
  );
};

export default DataTable2;