import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import DeleteBook from './pages/DeleteBook'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateBooks />} />
        <Route path='/delete' element={<DeleteBook />} />
        <Route path='/show' element={<ShowBook />} />
        <Route path='/edit/:id' element={<EditBook />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
