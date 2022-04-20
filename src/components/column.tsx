import ColumnFilter from './ColumnFiltering';
// eslint-disable-next-line no-sparse-arrays


export const COLS = [
  {
    Header: 'Id',
    accessor: 'id',
    Filter: ColumnFilter,
    disableFilters: true
  },
  {
    Header: 'First name',
    accessor: 'first_name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Last name',
    accessor: 'last_name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Email',
    accessor: 'email',
    Filter: ColumnFilter,
  },
];
