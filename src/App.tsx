import React from 'react';
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import Info from './pages/Info';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import BasicTable from './components/BasicTable';
import SortingTable from './components/SortingTable';
import GlobalFilteringTable from './components/FilteringTable';
import PaginationTable from './components/PaginationTable';
 

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addContact' element={<AddEdit />} />
          <Route path='/editContact/:id' element={<AddEdit />} />
          <Route path='/info/:id' element={<Info />} />
          <Route path='/table' element={<BasicTable />} />
          <Route path='/sort-table' element={<SortingTable />} />
          <Route path='/filter-table' element={<GlobalFilteringTable />} />
          <Route path='/pagination-table' element={<PaginationTable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
