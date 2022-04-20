import React from 'react';

interface IColumnFilter {
  column: any;
}

const ColumnFilter = ({ column }: IColumnFilter) => {

    const {filterValue, setFilter} = column
  return (
    <span>
      Search: <input value={filterValue || ''} onChange={(e: any) => setFilter(e.target.value)} />
    </span>
  );
};

export default ColumnFilter;
