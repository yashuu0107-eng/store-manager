import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
      <h2 className="text-xl font-bold text-blue-600 mb-4">React + Tailwind Widget</h2>
      <p className="mb-4">This React part is inside your site.</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Clicked {count} times
      </button>
    </div>
  );
}
