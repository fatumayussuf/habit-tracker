import { useLoaderData, Form } from "@remix-run/react";
import { useState } from "react";
import HabitList from "~/components/HabitList";

// This loader will provide the initial data.
export const loader = async () => {
  return { habits: [] }; // You can fetch or return real data here
};

// This action is called when the form is submitted.
export const action = async ({ request }) => {
  const formData = await request.formData();
  const habitName = formData.get('habitName');
  return { habitName }; // Return the added habit name for now (you can improve this later)
};

export default function Index() {
  const data = useLoaderData();
  const [habits, setHabits] = useState(data.habits);

  // Handle the form submission and add the new habit to the list
  const addHabit = (newHabitName) => {
    setHabits((prevHabits) => [
      ...prevHabits,
      { name: newHabitName, progress: Array(7).fill(false) },
    ]);
  };

  // Handle toggling habit progress (✔ / ❌)
  const toggleProgress = (habitIndex, dayIndex) => {
    const updatedHabits = [...habits];
    updatedHabits[habitIndex].progress[dayIndex] = !updatedHabits[habitIndex].progress[dayIndex];
    setHabits(updatedHabits);
  };

  // Handle form submission (add new habit)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const habitName = event.target.elements.habitName.value;
    if (habitName) {
      addHabit(habitName);
      event.target.reset(); // Reset input field after submission
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="habitName"
          placeholder="Add a new habit"
          className="border border-gray-300 rounded p-2 mr-2 w-80"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Habit
        </button>
      </form>

      {/* Render the Habit List */}
      <HabitList habits={habits} toggleProgress={toggleProgress} />
    </main>
  );
}
