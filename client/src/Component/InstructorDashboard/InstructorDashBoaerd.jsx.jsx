
import React, { useContext, useState } from 'react';
import { HomeSection } from './HomeSection';
// import { VideosSection } from './VideoSection';

import { YogaContext } from '../../Context/ContextApi';
import { NewClass } from './NewClass';
import { YogaClassesList } from './YogaClasseList';
import { InstructorClasses } from '../InstructorCompo/InstructorClasses';
import { EnrolledStudents } from './EntrolledStudent';

const TABS = {
  NEWCLASS: 'Newclass',
  MYCLASSES:'InstructorClasses',
  YOGACLASSESLIST: 'YogaClassesList',
  STUDENTS: 'EnrolledStudents',
  LOGOUT: 'Logout',
};

const InstructorDashboard = () => {
  const { setToken } = useContext(YogaContext);
  const [activeTab, setActiveTab] = useState(TABS.NEWCLASS);

  const renderSection = () => {
    switch (activeTab) {
      case TABS.NEWCLASS:
        return <NewClass />;
      case TABS.MYCLASSES:
        return <InstructorClasses />;
      case TABS.YOGACLASSESLIST:
        return <YogaClassesList/>;
      case TABS.STUDENTS:
        return <EnrolledStudents />;
      case TABS.LOGOUT:
        setToken('');
        return null;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="flex min-h-screen font-[Lexend] bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-6 space-y-4">
        <h2 className="text-2xl font-bold text-[#0e161b] mb-4">Dashboard</h2>
        <div className="flex flex-col space-y-2">
          {Object.values(TABS).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-left rounded-md font-medium text-sm ${
                activeTab === tab
                  ? 'bg-[#1890bf] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{renderSection()}</div>
    </div>
  );
};

export default InstructorDashboard;
