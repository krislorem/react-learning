import { useState } from "react";
import ExpensiveCalculation from "./ExpensiveCalculation";
const ExpensiveCalculationParent = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <ExpensiveCalculation number={count} />
    </div>);
};
export default ExpensiveCalculationParent;
