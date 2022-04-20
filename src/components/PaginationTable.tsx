import React, { useMemo } from 'react';
import { useTable, Column, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';
import { COLS } from './column';
import MOCK_DATA from '../MOCK_DATA.json';
import GlobalFilter from './GlobalFilter';
import ColumnFilter from './ColumnFiltering';

const PaginationTable = () => {
  const columnsHeader = useMemo(() => COLS, []);
  const MockData = useMemo(() => MOCK_DATA, []);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, state, setGlobalFilter } = useTable(
    {
      // @ts-ignore
      columns: columnsHeader,
      data: MockData,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} id='table'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? '<' : '>') : ''}</span>{' '}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
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

export default PaginationTable;
