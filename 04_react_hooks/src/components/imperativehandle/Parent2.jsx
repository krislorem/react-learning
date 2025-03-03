import { useRef } from "react";
import Counter2 from "./Counter2";
const Parent2 = () => {
  const counterRef = useRef();
  return (
    <div>
      <Counter2 ref={counterRef} />
      <button onClick={() => counterRef.current.reset()}>Reset Count</button></div>);
};
export default Parent2
