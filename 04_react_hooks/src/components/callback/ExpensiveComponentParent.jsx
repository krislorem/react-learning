import { useState, useCallback } from "react";
import ExpensiveComponent from "./ExpensiveComponent";
const ExpensiveComponentParent = () => {
  const [count, setCount] = useState(0);

  const memoizedAction = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <ExpensiveComponent onAction={memoizedAction} />
    </div>
  );
};

export default ExpensiveComponentParent;
