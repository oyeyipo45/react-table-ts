import React from 'react'

 interface IGlobalFilter {
     filter: any;
     setFilter: any

}

const GlobalFilter = ({ filter, setFilter }: IGlobalFilter) => {
    return (
        <span>
            Search: {' '}
            <input value={filter || ''} onChange={(e: any) => setFilter(e.target.value)} />
        </span>
    )
};

export default GlobalFilter