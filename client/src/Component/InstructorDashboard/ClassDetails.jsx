
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { YogaContext } from '../../Context/ContextApi';

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(YogaContext);

  const [classInfo, setClassInfo] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch(`http://localhost:8000/user/class/${id}`);
        const data = await res.json();
        setClassInfo(data);
        setInstructor(data.instructor);
      } catch (error) {
        console.error("Failed to fetch class details", error);
      }
    };

    fetchClass();
  }, [id]);

  const handleJoinClass = async () => {
    try {
      const res = await fetch(`http://localhost:8000/user/class/join/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setShowReviewModal(true);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Join failed", error);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:8000/user/user-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          instructorId: instructor._id,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Review submitted successfully");
        setShowReviewModal(false);
        navigate("/");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("❌ Error submitting review", err);
    }
  };

  if (!classInfo || !instructor)
    return <p className="text-center mt-10 text-lg text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 md:px-10 lg:px-24">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-10 max-w-3xl mx-auto">
        {/* Class Details */}
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          {classInfo.className}
        </h1>
        <p className="text-gray-700 mb-2">{classInfo.description}</p>
        <div className="text-gray-600 space-y-1 mb-6">
          <p><strong>📅 Schedule:</strong> {new Date(classInfo.schedule).toLocaleString()}</p>
          <p><strong>📡 Mode:</strong> {classInfo.isOnline ? 'Online' : 'Offline'}</p>
          <p><strong>💰 Price:</strong> ₹{classInfo.price}</p>
        </div>

        <hr className="my-6" />

        {/* Instructor Info */}
        <div>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">Instructor</h2>
          <div className="space-y-1 text-gray-700">
            <p><strong>Name:</strong> {instructor.name}</p>
            <p><strong>Email:</strong> {instructor.email}</p>
            <p><strong>Languages:</strong> {instructor.languagesSpoken?.join(', ') || 'N/A'}</p>
          </div>
        </div>

        {/* Join Class Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              handleJoinClass();
              navigate("/");  // Optional: navigate only after review
            }}
            className="w-full md:w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow transition duration-200"
          >
            🚀 Join Class
          </button>
        </div>
      </div>

      {/* REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-center mb-4">⭐ Rate the Instructor</h2>

            {/* Star Rating */}
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl cursor-pointer transition ${
                    rating >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Comment */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your experience..."
              className="w-full border rounded-md p-3 mb-4 text-sm resize-none"
              rows="4"
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => setShowReviewModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={handleReviewSubmit}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassDetails;
