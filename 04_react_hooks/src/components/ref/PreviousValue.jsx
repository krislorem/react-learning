import { useState, useRef, useEffect } from "react";

const PreviousValue = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>当前计数: {count}</p>
      <p>前一计数: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
};

export default PreviousValue;
