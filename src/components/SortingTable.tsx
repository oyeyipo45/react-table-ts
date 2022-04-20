import React, { useMemo } from 'react';
import { useTable, Column, useSortBy } from 'react-table';
import { COLS } from './column';
import MOCK_DATA from '../MOCK_DATA.json';


const SortingTable = () => {
  const columnsHeader = useMemo(() => COLS, []);
  const MockData = useMemo(() => MOCK_DATA, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
    // @ts-ignore
    columns: columnsHeader,
    data: MockData,
  },
      useSortBy
  )

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                    <span>
                        {column.isSorted ? (column.isSortedDesc ? '<' : '>' ) : ''}
                    </span> </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell: any) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SortingTable;
