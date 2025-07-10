
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const YogaAsanaSlider = () => {
  const [asanas, setAsanas] = useState([]);
  const [currentAsanaIndex, setCurrentAsanaIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchAsanas = async () => {
      try {
        const res = await fetch('http://localhost:8000/admin/all');
        const data = await res.json();
        if (res.ok) setAsanas(data.data);
        else alert(data.message);
      } catch (error) {
        console.error('Error fetching asanas:', error);
      }
    };

    fetchAsanas();
  }, []);

  const handleAsanaPrev = () => {
    const newIndex = (currentAsanaIndex - 1 + asanas.length) % asanas.length;
    setCurrentAsanaIndex(newIndex);
    setCurrentImageIndex(0);
  };

  const handleAsanaNext = () => {
    const newIndex = (currentAsanaIndex + 1) % asanas.length;
    setCurrentAsanaIndex(newIndex);
    setCurrentImageIndex(0);
  };

  const handleImagePrev = () => {
    const newIndex =
      (currentImageIndex - 1 + currentAsana.images.length) % currentAsana.images.length;
    setCurrentImageIndex(newIndex);
  };

  const handleImageNext = () => {
    const newIndex = (currentImageIndex + 1) % currentAsana.images.length;
    setCurrentImageIndex(newIndex);
  };

  if (asanas.length === 0) {
    return <p className="text-center py-10 text-gray-500 text-xl">Loading Yoga Asanas...</p>;
  }

  const currentAsana = asanas[currentAsanaIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-[Lexend]">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#14532d] mb-10">
        🧘 {currentAsana.name}
      </h1>

      {/* Image Section */}
      <div className="relative flex justify-center items-center mb-8">
        <button
          onClick={handleImagePrev}
          className="absolute left-0 p-2 sm:p-3 bg-gray-200 hover:bg-gray-300 rounded-full shadow z-10"
        >
          <FaArrowLeft size={22} />
        </button>

        <img
          src={currentAsana.images[currentImageIndex]}
          alt="Asana"
          className="w-full max-w-3xl h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-xl shadow-lg border-4 border-[#d1fae5] transition"
        />

        <button
          onClick={handleImageNext}
          className="absolute right-0 p-2 sm:p-3 bg-gray-200 hover:bg-gray-300 rounded-full shadow z-10"
        >
          <FaArrowRight size={22} />
        </button>
      </div>

      {/* Asana Info */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6 border border-[#e0f2fe]">
        <p className="text-center italic text-gray-700 text-base sm:text-lg leading-relaxed">
          {currentAsana.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#0e7490] mb-2">✅ Benefits</h3>
            <ul className="list-disc ml-6 text-gray-800 text-base sm:text-lg space-y-2">
              {currentAsana.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#0e7490] mb-2">⚠️ Precautions</h3>
            <ul className="list-disc ml-6 text-gray-800 text-base sm:text-lg space-y-2">
              {currentAsana.precautions.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#0e7490] mb-2">📋 Steps</h3>
          <ol className="list-decimal ml-6 text-gray-800 text-base sm:text-lg space-y-2">
            {currentAsana.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        {currentAsana.videoUrl && (
          <div className="text-center mt-6">
            <a
              href={currentAsana.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-bold underline text-base sm:text-lg"
            >
              ▶️ Watch Video Tutorial
            </a>
          </div>
        )}
      </div>

      {/* Asana Nav Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12">
        <button
          onClick={handleAsanaPrev}
          className="bg-[#0e7490] text-white px-6 py-3 rounded-full hover:bg-[#0c5e78] text-lg w-full sm:w-auto"
        >
          ← Previous Asana
        </button>
        <button
          onClick={handleAsanaNext}
          className="bg-[#0e7490] text-white px-6 py-3 rounded-full hover:bg-[#0c5e78] text-lg w-full sm:w-auto"
        >
          Next Asana →
        </button>
      </div>
    </div>
  );
};
