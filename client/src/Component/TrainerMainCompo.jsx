

import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, Navigate } from 'react-router-dom';

import UpdateInstructorProfile from './InstructorProfile/updateInstructorProfile';

import InstructorDashboard from './InstructorDashboard/InstructorDashBoaerd.jsx';


export const TrainerMainCompo = () => {
  return (
    <div>
      <ToastContainer />

      <Routes> 
        {/* Define dashboard as its own route */}
        <Route path="/dashboard" element={<InstructorDashboard />} /> 
        <Route path="/profile" element={<UpdateInstructorProfile />} />
      </Routes>
    </div>
  );
};
