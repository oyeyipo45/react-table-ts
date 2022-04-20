import React, {useState} from 'react'
import { useAsyncDebounce } from 'react-table';

 interface IGlobalFilter {
     filter: any;
     setFilter: any

}

const GlobalFilter = ({ filter, setFilter }: IGlobalFilter) => {
    const [value, setValue] = useState(filter)
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)
    return (
        <span>
            Search: {' '}
            <input value={value || ''} onChange={(e: any) => {setValue(e.target.value)
            onChange(e.target.value)}} />
        </span>
    )
};

export default GlobalFilter