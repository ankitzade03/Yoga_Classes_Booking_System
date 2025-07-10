import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InstructorDashboard from '../Component/InstructorDashboard/InstructorDashBoaerd.jsx'

export const AdminMainCompo = () => {
  return (
    <Routes>
           <Route path='/admin/dashboard' element={<InstructorDashboard/>}></Route>      
    </Routes>
  )
}
