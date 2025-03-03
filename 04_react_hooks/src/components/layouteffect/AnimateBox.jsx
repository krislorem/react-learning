import { useState, useLayoutEffect } from "react";

const AnimateBox = () => {
  const [position, setPosition] = useState(0);

  useLayoutEffect(() => {
    const timer = setInterval(() => {
      setPosition((prev) => prev + 5);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ width: "50px", height: "50px", backgroundColor: "red", transform: `translateX(${position}px)` }} />
  );
};

export default AnimateBox;
