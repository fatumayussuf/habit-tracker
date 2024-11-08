// src/components/GoalSetting.jsx
import { useState } from 'react';

export default function GoalSetting({ habit, updateGoal }) {
  const [goal, setGoal] = useState(habit.goal || 7); // Default goal is 7 days

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
    updateGoal(habit.id, e.target.value);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="font-semibold text-lg mb-2">Set Your Goal</h3>
      <input
        type="number"
        value={goal}
        onChange={handleGoalChange}
        min="1"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-sm text-gray-600 mt-2">Goal: Complete for {goal} days this month</p>
    </div>
  );
}
