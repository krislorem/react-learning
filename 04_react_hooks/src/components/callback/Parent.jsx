import { useState, useCallback } from "react";
import Child from "./Child";
const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <Child handleClick={handleClick} />
    </div>
  );
};

export default Parent;
