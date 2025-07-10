
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import { Home } from '../Pages/Home';
import { Footer } from './HomePageCompo/Footer';
import {AboutUs} from '../Pages/AboutUs'
import {ContactForm} from '../Pages/Contact'
import { AllInstructorsList } from '../Pages/Instructors';
import { UserProfile } from './User/UserProfile';

import ClassDetails from './InstructorDashboard/ClassDetails';
import { EnrolledClasses } from './HomePageCompo/EntrolledClasses';
import { YogaAsanaSlider } from '../Pages/Yogasans';
import { InstructorProfile } from './InstructorProfile/Instructorprofile2';
export const UserMainCompo = () => {
  return (
    <div>
      <ToastContainer/>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/trainers' element={<AllInstructorsList/>}></Route>
            <Route path='/aboutus' element={<AboutUs></AboutUs>}></Route>
            <Route path='/contact' element={<ContactForm></ContactForm>}></Route>
            <Route path='/yogasans' element={<YogaAsanaSlider/>}></Route>
            <Route path='/userProfile' element={<UserProfile></UserProfile>}></Route>
            <Route path="/instructor/:id" element={<InstructorProfile />} />
            <Route path="/class/:id" element={<ClassDetails />} />
            <Route path="/my-entrolled-classes" element={< EnrolledClasses/>} />
        </Routes>
        <Footer></Footer>
    </div>
  )
}



