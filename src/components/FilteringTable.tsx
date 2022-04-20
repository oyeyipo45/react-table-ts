import React, { useMemo } from 'react';
import { useTable, Column, useSortBy, useGlobalFilter, useFilters  } from 'react-table';
import { COLS } from './column';
import MOCK_DATA from '../MOCK_DATA.json';
import GlobalFilter from './GlobalFilter';

const FilteringTable = () => {
  const columnsHeader = useMemo(() => COLS, []);
  const MockData = useMemo(() => MOCK_DATA, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable(
    {
      // @ts-ignore
      columns: columnsHeader,
      data: MockData,
      },
      useFilters,
      useGlobalFilter,
    useSortBy,
    
  );
    
  const { globalFilter, } = state

  return (
      <>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> 
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? '<' : '>') : ''}</span>{' '}
                      <div>{column.canFilter ? column.render('Filter') : null }</div>
                </th>
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
    </>
  );
};

export default FilteringTable;
