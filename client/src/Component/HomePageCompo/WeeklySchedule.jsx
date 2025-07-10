
import React, { useState } from 'react';

export const WeeklySchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const currentDay = new Date().getDate();
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const Month = selectedDate.toLocaleString('en-US', { month: 'long' });
  const year = selectedDate.getFullYear();

  const handlePrevMonth = () => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() - 1,
      1
    );
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      1
    );
    setSelectedDate(newDate);
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-6 bg-[#f9fafb]">
      <h2 className="text-[#0e161b] text-xl sm:text-2xl font-bold tracking-tight mb-4">
        📅 Weekly Schedule
      </h2>

      <div className="flex justify-center">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-4 transition-all">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="hover:text-[#1f93e0] transition"
              aria-label="Previous Month"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
              </svg>
            </button>
            <p className="text-lg font-semibold text-[#0e161b]">
              {Month} {year}
            </p>
            <button
              onClick={handleNextMonth}
              className="hover:text-[#1f93e0] transition"
              aria-label="Next Month"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
              </svg>
            </button>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 text-center text-sm font-semibold text-[#4f8296] mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
            {Array.from({ length: daysInMonth }, (_, i) => {
              const date = i + 1;
              const isToday =
                selectedDate.getMonth() === new Date().getMonth() &&
                selectedDate.getFullYear() === new Date().getFullYear() &&
                date === currentDay;

              return (
                <button
                  key={date}
                  className={`h-10 w-full rounded-full transition-all duration-300 flex items-center justify-center 
                  ${
                    isToday
                      ? 'bg-[#1f93e0] text-white font-bold shadow-lg animate-pulse'
                      : 'hover:ring-2 hover:ring-[#1f93e0] hover:bg-blue-50'
                  }`}
                >
                  {date}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
