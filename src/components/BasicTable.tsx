import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { COLS } from './column';
import MOCK_DATA from '../MOCK_DATA.json';

export interface conse {
  header: string;
  accessor: string
}

// interface ITableLayoutProps {
//   data: readonly object[];
//   columns: readonly Column<object>[];
//   isLoading?: boolean;
//   isError?: boolean;
//   emptyElement?: React.ReactNode;
//   svgIcon?: React.ReactNode;
//   extraUrl?: string;
//   extraName?: string;
//   isPaginated?: boolean;
//   totalPageCount: number;
//   showCheckBoxColumn?: boolean;
//   entityName?: string;
//   colorScheme?: string;
//   dataCount?: number;
// }

const BasicTable = () => {

  const columnsHeader = useMemo(() => COLS, []);
  const MockData = useMemo(() => MOCK_DATA, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow }  = useTable({
    // @ts-ignore
    columns: columnsHeader,
    data: MockData,
  });


  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell :any) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
             
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BasicTable;
