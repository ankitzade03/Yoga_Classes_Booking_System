

// import React, { useEffect, useState } from "react";

// export const UsersSection = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Static data (API simulation)
//     const data = {
//       users: [
//         {
//           _id: "684ac4658962447ec5dec44f",
//           username: "Ankit zade",
//           email: "ankitzade914@gmail.com",
//           role: "user",
//           age: 21,
//           bio: "i like to swim",
//           profileImage: "https://res.cloudinary.com/dkhxqvhlt/image/upload/v1750501355/suvf5cauk74ksanlvg2i.jpg",
//           whatsappNumber: "8605120267",
//           gender: "male",
//           location: "London",
//         },
//         {
//           _id: "6854cddb32541c0073f56eb1",
//           username: "kartik234",
//           email: "kartik234@gmail.com",
//           role: "user",
//           profileImage: "https://res.cloudinary.com/dkhxqvhlt/image/upload/v1750501858/kptohdodjagvrbhhigq2.jpg",
//           age: 21,
//           bio: "Like to Play kabbadi",
//           gender: "male",
//           location: "Delhi",
//         },
//         {
//           _id: "6854d0c932541c0073f56eb7",
//           username: "Pranav nilavr",
//           email: "nilawarPranav4@gmail.com",
//           role: "user",
//           profileImage: "",
//         },
//         {
//           _id: "684ac4658962447ec5dec44f",
//           username: "Ankit zade",
//           email: "ankitzade914@gmail.com",
//           role: "user",
//           age: 21,
//           bio: "i like to swim",
//           profileImage: "https://res.cloudinary.com/dkhxqvhlt/image/upload/v1750501355/suvf5cauk74ksanlvg2i.jpg",
//           whatsappNumber: "8605120267",
//           gender: "male",
//           location: "London",
//         },
//         {
//           _id: "6854cddb32541c0073f56eb1",
//           username: "kartik234",
//           email: "kartik234@gmail.com",
//           role: "user",
//           profileImage: "https://res.cloudinary.com/dkhxqvhlt/image/upload/v1750501858/kptohdodjagvrbhhigq2.jpg",
//           age: 21,
//           bio: "Like to Play kabbadi",
//           gender: "male",
//           location: "Delhi",
//         },
//         {
//           _id: "6854d0c932541c0073f56eb7",
//           username: "Pranav nilavr",
//           email: "nilawarPranav4@gmail.com",
//           role: "user",
//           profileImage: "",
//         },
//         {
//           _id: "684ac4658962447ec5dec44f",
//           username: "Ankit zade",
//           email: "ankitzade914@gmail.com",
//           role: "user",
//           age: 21,
//           bio: "i like to swim",
//           profileImage: "https://res.cloudinary.com/dkhxqvhlt/image/upload/v1750501355/suvf5cauk74ksanlvg2i.jpg",
//           whatsappNumber: "8605120267",
//           gender: "male",
//           location: "London",
//         },
//         {
//           _id: "6854cddb32541c0073f56eb1",
//           username: "kartik234",
//           email: "kartik234@gmail.com",
//           role: "user",
//           profileImage: "https://res.cloudinary.com/dkhxqvhlt/image/upload/v1750501858/kptohdodjagvrbhhigq2.jpg",
//           age: 21,
//           bio: "Like to Play kabbadi",
//           gender: "male",
//           location: "Delhi",
//         },
//         {
//           _id: "6854d0c932541c0073f56eb7",
//           username: "Pranav nilavr",
//           email: "nilawarPranav4@gmail.com",
//           role: "user",
//           profileImage: "",
//         },
//       ],
//     };

//     setUsers(data.users);
//   }, []);

//   const getInitials = (name) => {
//     return name
//       ?.split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();
//   };

//   return (
//     <div className="bg-white min-h-screen py-6 px-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {users.map((user, index) => (
//           <div
//             key={index}
//             className="bg-gradient-to-tr from-white via-slate-100 to-white rounded-3xl border border-indigo-100 shadow-xl hover:scale-[1.02] transform transition duration-300 p-6 text-center"
//           >
//             <div className="flex justify-center mb-4">
//               {user.profileImage ? (
//                 <img
//                   src={user.profileImage}
//                   alt={user.username}
//                   className="w-24 h-24 object-cover rounded-full ring-4 ring-indigo-300 hover:scale-105 transition duration-300"
//                 />
//               ) : (
//                 <div className="w-24 h-24 flex items-center justify-center text-xl font-bold bg-indigo-100 text-indigo-600 rounded-full ring-4 ring-indigo-300">
//                   {getInitials(user.username || "U")}
//                 </div>
//               )}
//             </div>

//             <h2 className="text-xl font-bold text-indigo-700 mb-1">
//               {user.username || "Unknown User"}
//             </h2>
//             <p className="text-sm text-gray-600">{user.email}</p>
//             <p className="text-sm italic text-gray-500 mt-1">{user.bio || "No bio provided."}</p>

//             <div className="mt-4 text-sm text-gray-600 space-y-1">
//               <p>
//                 <strong>Age:</strong> {user.age || "N/A"}
//               </p>
//               <p>
//                 <strong>Gender:</strong> {user.gender || "N/A"}
//               </p>
//               <p>
//                 <strong>Location:</strong> {user.location || "N/A"}
//               </p>
//               <p>
//                 <strong>Role:</strong>{" "}
//                 <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-semibold">
//                   {user.role}
//                 </span>
//               </p>
//             </div>

//             {/* {user.whatsappNumber && (
//               <a
//                 href={`https://wa.me/${user.whatsappNumber}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-4 inline-block px-4 py-1.5 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition"
//               >
//                 WhatsApp
//               </a>
//             )} */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState} from 'react';
import { useContext } from 'react';
import { SoftContext } from '../../../Context/SoftContext';

export const Users = () => {

  const {token}=useContext(SoftContext);
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:8000/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        } else {
          console.error('Failed to fetch users:', data.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#1890bf] text-center mb-10">
        👥 All Registered Users
      </h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-2xl p-5 flex flex-col"
            >
              {/* Profile Image */}
              <div className="flex flex-col items-center gap-3">
                <img
                  src={
                    user.profileImage
                      ? user.profileImage
                      : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                  }
                  alt={user.username}
                  className="w-24 h-24 object-cover rounded-full border"
                />
                <h2 className="text-lg font-bold text-[#0e1b19]">
                  {user.name || user.username}
                </h2>
                <p className="text-sm text-[#4f8296]">{user.email}</p>
              </div>

              {/* User Info */}
              <div className="mt-4 text-sm text-gray-700 space-y-1">
                <p>
                  <strong>🎭 Role:</strong>{' '}
                  <span className="capitalize">{user.role}</span>
                </p>

                {user.age && (
                  <p>
                    <strong>🎂 Age:</strong> {user.age}
                  </p>
                )}

                {user.gender && (
                  <p>
                    <strong>⚥ Gender:</strong> {user.gender}
                  </p>
                )}

                {user.location && (
                  <p>
                    <strong>📍 Location:</strong> {user.location}
                  </p>
                )}

                {user.bio && (
                  <p>
                    <strong>🧾 Bio:</strong> {user.bio}
                  </p>
                )}

                <p>
                  <strong>📚 Enrolled Classes:</strong>{' '}
                  {user.enrolledClasses.length > 0
                    ? user.enrolledClasses.length
                    : 'None'}
                </p>

                <p>
                  <strong>📝 Reviews:</strong>{' '}
                  {user.reviewsGiven.length > 0
                    ? user.reviewsGiven.length
                    : 'None'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
