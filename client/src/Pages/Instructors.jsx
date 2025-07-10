
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AllInstructorsList = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await fetch("http://localhost:8000/user/instructors");
        const data = await res.json();
        setInstructors(data.instructors || []);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb] py-10 px-4 sm:px-8">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-12">
        Meet Our Instructors
      </h1>

      {instructors.length === 0 ? (
        <p className="text-center text-gray-500">No instructors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor) => (
            <div
              key={instructor._id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
            >
              {/* Profile Image and Name */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    instructor.profileImage ||
                    "https://placehold.co/100x100?text=No+Image"
                  }
                  alt={instructor.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {instructor.name}
                  </h2>
                  <p className="text-sm text-gray-500">{instructor.email}</p>
                </div>
              </div>

              {/* Details */}
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Joined:</strong>{" "}
                  {new Date(instructor.joinedAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                      instructor.isOnline
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {instructor.isOnline ? "Online" : "Offline"}
                  </span>
                </p>
                <p>
                  <strong>Expertise:</strong>{" "}
                  {instructor.expertiseAreas?.length > 0
                    ? instructor.expertiseAreas.join(", ")
                    : "Not listed"}
                </p>
                <p>
                  <strong>Languages:</strong>{" "}
                  {instructor.languagesSpoken?.length > 0
                    ? instructor.languagesSpoken.join(", ")
                    : "Not specified"}
                </p>
                {instructor.location && (
                  <p>
                    <strong>Location:</strong> {instructor.location}
                  </p>
                )}
                {instructor.whatsappNumber && (
                  <p>
                    <strong>WhatsApp:</strong> +91 {instructor.whatsappNumber}
                  </p>
                )}
              </div>

              {/* Availability */}
              {instructor.availability?.length > 0 && (
                <div className="mt-4">
                  <strong className="text-sm">Availability:</strong>
                  <ul className="list-disc ml-5 mt-1 text-gray-600 text-sm">
                    {instructor.availability.map((slot, index) => (
                      <li key={`${slot.day}-${index}`}>
                        {slot.day} - {slot.time}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* View Button */}
              <div className="mt-6 text-right">
                <button
                  onClick={() => navigate(`/user/instructor/${instructor._id}`)}
                  className="bg-indigo-600 text-white px-5 py-2 text-sm rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

