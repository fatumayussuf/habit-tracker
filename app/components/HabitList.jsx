// src/components/HabitList.jsx
import { useState, useEffect } from "react";
import GoalSetting from './GoalSetting';

export default function HabitList({ habits, toggleProgress }) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Get all days of the selected month
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleYearChange = (e) => setSelectedYear(e.target.value);

  const getProgress = (habit) => {
    const completedDays = habit.progress.filter(Boolean).length;
    return `${completedDays} / ${daysInMonth.length} days completed`;
  };

  const getStreak = (habit) => {
    const streak = habit.progress.reduce((streak, completed, index) => {
      return completed ? streak + 1 : streak;
    }, 0);
    return streak;
  };

  const updateGoal = (habitId, newGoal) => {
    const updatedHabits = habits.map((habit) => 
      habit.id === habitId ? { ...habit, goal: newGoal } : habit
    );
    localStorage.setItem('habits', JSON.stringify(updatedHabits)); // Save to localStorage
  };

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem('habits'));
    if (storedHabits) {
      // Update state from localStorage
      habits = storedHabits;
    }
  }, []);

  return (
    <div className="space-y-6 mt-20">
      {habits.map((habit, index) => (
        <div key={index} className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 rounded-lg shadow-xl text-white">
          <h2 className="text-3xl font-bold mb-4">{habit.name}</h2>

          {/* Goal Setting Component */}
          <GoalSetting habit={habit} updateGoal={updateGoal} />

          {/* Month and Year Selection */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedMonth(selectedMonth === 0 ? 11 : selectedMonth - 1)}
                className="bg-indigo-700 p-2 rounded-full text-xl hover:bg-indigo-800 transition-colors"
              >
                &lt; Prev
              </button>
              
              {/* Dropdowns for month and year */}
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="bg-indigo-600 text-lg font-semibold p-2 rounded-md shadow-md"
              >
                {Array.from({ length: 12 }).map((_, month) => (
                  <option key={month} value={month}>
                    {new Date(0, month).toLocaleString("default", { month: "long" })}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="bg-indigo-600 text-lg font-semibold p-2 rounded-md shadow-md"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <option key={i} value={currentYear - 5 + i}>
                    {currentYear - 5 + i}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setSelectedMonth(selectedMonth === 11 ? 0 : selectedMonth + 1)}
                className="bg-indigo-700 p-2 rounded-full text-xl hover:bg-indigo-800 transition-colors"
              >
                Next &gt;
              </button>
            </div>

            {/* Progress insight */}
            <div className="text-lg font-medium">
              {getProgress(habit)}
            </div>
          </div>

          {/* Calendar Header (Weekdays) */}
          <div className="grid grid-cols-7 text-center font-semibold mb-2">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="text-sm text-gray-200">{day}</div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-4">
            {daysInMonth.map((day, dayIndex) => {
              const dayCompleted = habit.progress[dayIndex] || false;
              const dayNumber = day.getDate();
              const isToday = today.getDate() === dayNumber && today.getMonth() === selectedMonth && today.getFullYear() === selectedYear;

              return (
                <div
                  key={dayIndex}
                  onClick={() => toggleProgress(index, dayIndex)}
                  className={`flex items-center justify-center w-14 h-14 rounded-lg cursor-pointer transition-all ease-in-out
                    ${dayCompleted ? "bg-green-500" : "bg-gray-200 hover:bg-gray-300"} 
                    ${isToday ? "border-4 border-yellow-400 transform scale-105" : ""} 
                    ${day.getMonth() !== selectedMonth ? "text-gray-400" : "text-black"}`}
                >
                  <span className="text-sm font-semibold">{dayNumber}</span>
                </div>
              );
            })}
          </div>

          {/* Habit Streak */}
          <div className="mt-4 text-center text-xl font-bold">
            Streak: {getStreak(habit)} days
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-400 rounded-full h-2 mt-4">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{
                width: `${(habit.progress.filter(Boolean).length / daysInMonth.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
