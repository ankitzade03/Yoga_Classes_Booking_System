import { useState } from "react";


// export const CreateInstructor = () => {
//   const [instructor, setInstructor] = useState({ name: "", email: "" });

//   const handleChange = (e) => {
//     setInstructor({ ...instructor, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:8000/admin/create_instructor", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(instructor),
//       });

//       const data = await res.json();
//       alert(data.message);
//       setInstructor({ name: "", email: "" });
//       // You can manually switch tab or notify parent if needed
//     } catch (error) {
//       console.error("Instructor creation error:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-[90vh] px-4">
//       <div className="w-full max-w-xl bg-white shadow rounded-lg p-8">
//         <h2 className="text-2xl font-bold text-[#0e161b] mb-6 text-center">
//           Create New Instructor
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Instructor Name
//             </label>
//             <input
//               name="name"
//               onChange={handleChange}
//               value={instructor.name}
//               placeholder="John Doe"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Instructor Email
//             </label>
//             <input
//               name="email"
//               type="email"
//               onChange={handleChange}
//               value={instructor.email}
//               placeholder="john@example.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#1890bf] hover:bg-[#147ea8] text-white font-medium py-2 rounded-md transition duration-200"
//           >
//             Create Instructor
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };


export const CreateInstructor = ({ onSuccess }) => {
  const [instructor, setInstructor] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setInstructor({ ...instructor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/admin/create_instructor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(instructor),
      });

      const data = await res.json();
      alert(data.message);
      setInstructor({ name: "", email: "" });

      if (onSuccess) onSuccess(); // ✅ Notify AdminDashboard to switch tab
    } catch (error) {
      console.error("Instructor creation error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh] px-4">
      <div className="w-full max-w-xl bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold text-[#0e161b] mb-6 text-center">
          Create New Instructor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructor Name
            </label>
            <input
              name="name"
              onChange={handleChange}
              value={instructor.name}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructor Email
            </label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              value={instructor.email}
              placeholder="john@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1890bf] hover:bg-[#147ea8] text-white font-medium py-2 rounded-md transition duration-200"
          >
            Create Instructor
          </button>
        </form>
      </div>
    </div>
  );
};
