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

  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setGlobalFilter
  } = useTable(
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

  const { globalFilter, pageIndex } = state;

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

      <div className='center'>
        <span style={{ margin: '5px', padding: '4px' }}>
          {' '}
          {pageIndex + 1} of {pageOptions.length}{' '}
        </span>
        <button style={{ margin: '5px', padding: '4px' }} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button style={{ margin: '5px', padding: '4px' }} onClick={() => previousPage()} disabled={!canPreviousPage}>
          Prev
        </button>
        <button style={{ margin: '5px', padding: '4px' }} onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button style={{ margin: '5px', padding: '4px' }} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </div>
    </>
  );
};

export default PaginationTable;
