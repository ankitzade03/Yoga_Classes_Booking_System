
import React, { useState } from 'react';

const images = [
  "https://cdn.usegalileo.ai/sdxl10/536e92de-105d-4354-813f-f19cb3f20689.png",
  "https://cdn.usegalileo.ai/sdxl10/2e58a568-aa50-44e4-9391-dbb85b43a4dc.png",
  "https://cdn.usegalileo.ai/sdxl10/536e92de-105d-4354-813f-f19cb3f20689.png",
  "https://cdn.usegalileo.ai/sdxl10/2e58a568-aa50-44e4-9391-dbb85b43a4dc.png",
];

export const Asans100 = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-[#f8fbfb] font-['Lexend','Noto Sans','sans-serif']">
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#e8f0f3] px-4 sm:px-6 md:px-10 py-3">
          <div className="flex items-center gap-4 text-[#0e171b]">
            <div className="w-4">
              {/* Logo */}
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-lg font-bold">Yoga Guru</h2>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-4 px-4 sm:px-6 md:px-10 py-5">
          {/* Sidebar */}
          <div className="w-full md:w-80 flex flex-col gap-4 max-h-[400px] overflow-y-auto">
            <div className="px-4">
              <label className="block">
                <div className="flex items-center bg-[#e8f0f3] rounded-xl">
                  <div className="pl-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search Yoga Asanas"
                    className="w-full bg-[#e8f0f3] px-3 py-2 rounded-r-xl text-sm text-[#0e171b] focus:outline-none"
                  />
                </div>
              </label>
            </div>

            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="px-4 py-2 bg-[#f8fbfb]">
                <p className="text-[#0e171b] text-base truncate">Asana {num}</p>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-2xl font-bold text-[#0e171b] px-4 pt-2 pb-4">Asana {current + 1}</h3>

            {/* Navigation buttons */}
            <div className="flex gap-3 px-4 pb-3 flex-wrap justify-start">
              <button
                onClick={handlePrev}
                className="rounded-full bg-[#e8f0f3] px-4 h-10 text-sm font-bold text-[#0e171b]"
              >
                &lt; Previous
              </button>
              <button
                onClick={handleNext}
                className="rounded-full bg-[#1890bf] px-4 h-10 text-sm font-bold text-white"
              >
                Next &gt;
              </button>
            </div>

            {/* Image carousel */}
            <div className="relative w-full bg-[#c9efef] h-80 sm:h-96 md:h-[520px] rounded-xl overflow-hidden">
              <div
                className="w-full h-full bg-center bg-no-repeat bg-cover transition-all duration-500"
                style={{ backgroundImage: `url(${images[current]})` }}
              ></div>

              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full shadow p-1 md:p-2 hover:bg-gray-100"
              >
                ◀
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full shadow p-1 md:p-2 hover:bg-gray-100"
              >
                ▶
              </button>
            </div>

            {/* Steps */}
            <h1 className="text-xl font-bold text-[#0e171b] px-4 pt-6 pb-2">How to do?</h1>
            <p className="text-base text-[#0e171b] px-4 pb-4">
              1. Step 1 2. Step 2 3. Step 3 4. Step 4 5. Step 5 6. Step 6 7. Step 7 8. Step 8 9. Step 9
            </p>

            {/* Actions */}
            <div className="flex gap-3 px-4 pb-6 justify-end flex-wrap">
              <button className="rounded-full h-10 px-4 text-sm font-bold text-[#0e171b] bg-transparent">
                Save to my list
              </button>
              <button className="rounded-full h-10 px-4 text-sm font-bold text-[#0e171b] bg-[#e8f0f3]">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
