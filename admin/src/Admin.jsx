
import React, { useContext, useState } from 'react';

import { FiUsers, FiBookOpen, FiBarChart2, FiSettings, FiLogOut, FiMenu } from 'react-icons/fi';
import Cookies from 'js-cookie'; 
import { ClassesSection } from './Components/AdminCompo/ClassesSection';
import { SettingsSection } from './Components/AdminCompo/SettingsSection';
import { CreateAsanaForm } from './Components/CreateAsanaForm';
import { Instructors } from './Components/AdminCompo/Instructors';
import { Users } from './Components/AdminCompo/UsersSection';
import { CreateInstructor } from './Components/AdminOperations/InstructorCreation';
import { SoftContext } from '../Context/SoftContext';
import { useNavigate } from 'react-router-dom';


const TABS = [
  { key: 'Users', label: 'Users', icon: <FiUsers /> },
  { key: 'Instructors', label: 'Instructors', icon: <FiBarChart2 /> },
  { key: 'AdminCreateInstructor', label: 'AdminCreateInstructor', icon: <FiUsers /> },
  { key: 'Classes', label: 'Classes', icon: <FiBookOpen /> },
  { key: 'CreateAsans', label: 'CreateAsans', icon: <FiSettings /> },
  
];

const AdminDashboard = () => {

  const navigate=useNavigate();

  const{setRole,setToken}=useContext(SoftContext);

  const [activeTab, setActiveTab] = useState('Users');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderSection = () => {
    switch (activeTab) {
      case 'AdminCreateInstructor':
        return <CreateInstructor onSuccess={() => setActiveTab("Instructors")} />
      case 'Users':
        return <Users />;
      case 'Instructors':
        return <Instructors></Instructors>;
      case 'Classes':
        return <ClassesSection />;
      case 'CreateAsans':
        return < CreateAsanaForm/>;
      default:
        return <Users />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden font-[Lexend] bg-[#f9fbfd]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-white border-r transition-all duration-300 ease-in-out flex flex-col p-4 space-y-4`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="self-end mb-4 text-gray-600 hover:text-[#1890bf]"
        >
          <FiMenu size={22} />
        </button>

        {/* Navigation Tabs */}
        <nav className="flex-1 space-y-2">
          {TABS.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-[#1890bf] text-white'
                  : 'text-gray-700 hover:bg-[#e8f5fc] hover:text-[#1890bf]'
              }`}
            >
              {icon}
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={() => {
            setToken(null); // Clear context token
            setRole(null);
            Cookies.remove('token');
            Cookies.remove('role');
            navigate("/login");
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-[#ffeaea] hover:text-red-700 transition"
        >
          <FiLogOut />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* Main Content Scrollable */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;
