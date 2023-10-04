"use client";

import { useState } from "react";

const ExampleComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Example Component</h1>
      <p>Count: {count}</p>

      <button
        onClick={() => setCount(count + 1)}
        className="rounded bg-zinc-400 px-4 py-2 font-bold text-black hover:bg-zinc-500"
      >
        Increment
      </button>

      <button
        onClick={() => setCount(count - 1)}
        className="rounded bg-zinc-400 px-4 py-2 font-bold text-black hover:bg-zinc-500"
      >
        Decrement
      </button>
    </div>
  );
};

export default ExampleComponent;
