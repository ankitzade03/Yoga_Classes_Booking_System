
import React from "react";

export const Calendar = () => {
  const today = new Date();
  const currentDay = today.getDate();

  // Get the month name
  const monthName = today.toLocaleString('en-US', { month: 'long' });

  // Get the first day of the month
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startDay = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)

  // Get the number of days in the month
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const dayNames = ['SUN', 'M', 'T', 'W','TH' ,'F', 'S'];

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
      <h2 className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 pb-3 pt-2">
        {monthName} Schedule
      </h2>

      {/* Day headings */}
      <div className="grid grid-cols-7 px-2">
       
        {dayNames.map((day, idx) => (
          <p key={`${day}-${idx}`} className="text-[#0e161b] text-[13px] font-bold flex h-10 items-center justify-center">{day}</p>
        ))}

      </div>

      {/* Dates grid */}
      <div className="grid grid-cols-7 gap-1 px-2">
        {/* Empty slots for start offset */}
        {Array(startDay).fill(null).map((_, idx) => (
          <div key={`empty-${idx}`} className="h-10"></div>
        ))}

        {/* Dates */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const isToday = date === currentDay;

          return (
            <button
              key={`day-${date}`}
              className={`h-10 w-full text-sm font-medium leading-normal ${
                isToday ? "text-[#1f93e0]" : "text-[#0e161b]"
              }`}
            >
              <div
                className={`flex size-full items-center justify-center rounded-full ${
                  isToday ? "relative font-bold" : ""
                }`}
              >
                {date}
                {isToday && (
                  <span className="absolute bottom-1 w-1 h-1.5 bg-[#1f93e0] rounded-full"></span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
