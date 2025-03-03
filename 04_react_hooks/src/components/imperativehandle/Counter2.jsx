import { useImperativeHandle, forwardRef, useState } from "react";

const Counter2 = forwardRef((props, ref) => {
  const [count, setCount] = useState(10);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setCount(0);
    },
  }));

  return <div>Count: {count}</div>;
});

export default Counter2;
