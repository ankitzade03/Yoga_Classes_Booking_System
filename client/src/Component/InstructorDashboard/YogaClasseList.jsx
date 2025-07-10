
import React, { useContext, useEffect, useState } from "react";
import { YogaContext } from "../../Context/ContextApi";

export const YogaClassesList = () => {

  const {token}=useContext(YogaContext);

  const [classes, setClasses] = useState([]);

  const fetchMyClasses = async () => {
    try {
      const res = await fetch("http://localhost:8000/instructor/instructors/my-classes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setClasses(data.classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleDelete = async (classId) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;
    try {
      await fetch(`http://localhost:8000/instructor/class/${classId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // After deletion, refresh class list
      fetchMyClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const handleUpdate = (cls) => {
    // You can route to an edit page or open a modal with pre-filled values
    alert(`Navigate to edit page for class: ${cls.className}`);
  };

  useEffect(() => {
    fetchMyClasses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-indigo-800 mb-10">
        Your Created Yoga Classes
      </h1>

      {classes.length === 0 ? (
        <p className="text-center text-gray-600">No classes available.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-indigo-700 mb-2">{cls.className}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(cls.schedule).toLocaleDateString("en-IN")}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Time:</strong>{" "}
                  {new Date(cls.schedule).toLocaleTimeString("en-IN")}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Price:</strong> ₹{cls.price}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Mode:</strong>{" "}
                  {cls.isOnline ? (
                    <span className="text-green-600 font-medium">Online</span>
                  ) : (
                    <span className="text-red-600 font-medium">Offline</span>
                  )}
                </p>
                {cls.isOnline && (
                  <p className="text-sm text-blue-500 truncate">
                    <a href={cls.meetingLink} target="_blank" rel="noreferrer">
                      Join Link
                    </a>
                  </p>
                )}
                <p className="text-sm text-gray-700 mt-3">{cls.description}</p>
              </div>

              <div className="mt-5 flex justify-between">
                <button
                  onClick={() => handleUpdate(cls)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(cls._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
