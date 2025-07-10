import React from 'react'
import { ScrollerWindow } from '../Component/HomePageCompo/scrollerWindow'
import { FeatureClasses } from '../Component/HomePageCompo/FeatureClasses'
import { WeeklySchedule } from '../Component/HomePageCompo/WeeklySchedule'
import { Instructor } from '../Component/HomePageCompo/Instructor'


export const Home = () => {
  return (
    <>
      <ScrollerWindow></ScrollerWindow>
      <FeatureClasses></FeatureClasses>
      <WeeklySchedule></WeeklySchedule>
      <Instructor></Instructor>
    </>
  )
}

