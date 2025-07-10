
// import React, { useEffect, useState } from "react";

// export const ClassesSection = () => {
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);

  
//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/admin/get-all-class");
//         const data = await res.json();
//         setClasses(data.classes || []); // or just `data` if no wrapper
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching classes:", error);
//         setLoading(false);
//       }
//     };

//     fetchClasses();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-lg text-indigo-600 font-semibold">Loading classes...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
//         Available Yoga Classes
//       </h1>

//       {classes.length === 0 ? (
//         <p className="text-center text-gray-500">No classes available.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {classes.map((cls) => (
//             <div
//               key={cls._id}
//               className="bg-indigo-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5"
//             >
//               <h2 className="text-xl font-bold text-indigo-800 mb-1">
//                 {cls.className}
//               </h2>
//               <p className="text-sm text-gray-600 mb-1">
//                 <strong>Instructor:</strong> {cls.instructor?.name || "N/A"}
//               </p>
//               <p className="text-sm text-gray-600 mb-1">
//                 <strong>Email:</strong> {cls.instructor?.email || "N/A"}
//               </p>
//               <p className="text-sm text-gray-600 mb-1">
//                 <strong>Price:</strong> ₹{cls.price}
//               </p>
//               <p className="text-sm text-gray-600 mb-1">
//                 <strong>Time:</strong>{" "}
//                 {new Date(cls.schedule).toLocaleString("en-IN", {
//                   dateStyle: "medium",
//                   timeStyle: "short",
//                 })}
//               </p>
//               <p className="text-sm text-gray-700 my-2">{cls.description}</p>

//               {cls.isOnline ? (
//                 <a
//                   href={cls.meetingLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block mt-3 bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-xl text-center hover:bg-green-600 transition"
//                 >
//                   Join Class
//                 </a>
//               ) : (
//                 <p className="text-red-600 mt-3 text-sm font-semibold">
//                   Offline class. Location: {cls.location || "To be announced"}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// import React, { useEffect, useState } from 'react';

// export const ClassesSection= () => {
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     const fetchInstructorClasses = async () => {
//       try {
//         const res = await fetch('http://localhost:8000/admin/get-all-class'); // adjust endpoint if needed
//         const data = await res.json();
//         if (data.success) {
//           setClasses(data.classes);
//         } else {
//           console.error('Failed to fetch classes');
//         }
//       } catch (error) {
//         console.error('Error fetching instructor classes:', error);
//       }
//     };

//     fetchInstructorClasses();
//   }, []);

//   if (classes.length === 0) {
//     return (
//       <div className="text-center py-20 text-gray-500">
//         <p>😕 No classes created yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
//       <h1 className="text-3xl font-bold text-[#1f93e0] mb-8 text-center">
//         📘 Your Created Classes
//       </h1>

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {classes.map((cls) => (
//           <div
//             key={cls._id}
//             className="bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition-all p-6 flex flex-col justify-between"
//           >
//             <div>
//               <h2 className="text-xl font-bold text-[#134e4a] mb-2">{cls.className}</h2>
//               <p className="text-sm text-gray-700 mb-3">{cls.description}</p>

//               <div className="text-sm text-gray-600 space-y-1">
//                 <p><strong>📅 Schedule:</strong> {new Date(cls.schedule).toLocaleString()}</p>
//                 <p>
//                   <strong>📡 Mode:</strong>{' '}
//                   <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
//                     cls.isOnline ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'
//                   }`}>
//                     {cls.isOnline ? 'Online' : 'Offline'}
//                   </span>
//                 </p>
//                 <p><strong>💰 Price:</strong> ₹{cls.price}</p>
//                 <p><strong>👥 Max Students:</strong> {cls.maxStudents}</p>
//                 <p><strong>✅ Enrolled:</strong> {cls.enrolledStudents.length}</p>
//               </div>

//               {cls.isOnline && cls.meetingLink && (
//                 <p className="mt-2">
//                   <strong>🔗 Meeting Link:</strong>{' '}
//                   <a
//                     href={cls.meetingLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline hover:text-blue-800"
//                   >
//                     Join Meeting
//                   </a>
//                 </p>
//               )}
//             </div>

//             {/* Instructor Info */}
//             <div className="border-t mt-4 pt-4 text-sm text-gray-500">
//               <p>👨‍🏫 <strong>Instructor:</strong> {cls.instructor.name}</p>
//               <p>📧 {cls.instructor.email}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { SoftContext } from '../../../Context/SoftContext';

export const ClassesSection = () => {

  const {token}=useContext(SoftContext);
  
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchAllClasses = async () => {
      try {
        const res = await fetch('http://localhost:8000/admin/get-all-class', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 👈 This is mandatory for protected routes
        },
      });
        const data = await res.json();

        console.log(data)
        if (data.success) {
          setClasses(data.classes);
        } else {
          console.error('Failed to fetch classes');
        }
      } catch (error) {
        console.error('Error fetching admin classes:', error);
      }
    };

    fetchAllClasses();
  }, []);

  if (classes.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>😕 No classes found in the system.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">📋 All Yoga Classes</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all p-6"
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold text-green-700 mb-1">{cls.className}</h2>
              <p className="text-sm text-gray-700">{cls.description}</p>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>📅 Schedule:</strong> {new Date(cls.schedule).toLocaleString()}</p>
              <p><strong>👤 Instructor:</strong> {cls.instructor.name}</p>
              <p><strong>📧 Email:</strong> {cls.instructor.email}</p>
              <p>
                <strong>📡 Mode:</strong>{' '}
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  cls.isOnline ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                }`}>
                  {cls.isOnline ? 'Online' : 'Offline'}
                </span>
              </p>
              <p><strong>💰 Price:</strong> ₹{cls.price}</p>
              <p><strong>👥 Max Students:</strong> {cls.maxStudents}</p>
              <p><strong>✅ Enrolled:</strong> {cls.enrolledStudents.length}</p>
              {cls.isOnline && cls.meetingLink && (
                <p className="mt-1">
                  <strong>🔗 Meeting:</strong>{' '}
                  <a
                    href={cls.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline hover:text-indigo-800"
                  >
                    Join Link
                  </a>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
