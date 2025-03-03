import { useState, useLayoutEffect, useRef } from "react";

const ComponentSize = () => {
  const [size, setSize] = useState(0);
  const divRef = useRef();

  useLayoutEffect(() => {
    setSize(divRef.current.offsetWidth);
  }, []);

  return (
    <div>
      <div ref={divRef} style={{ width: "100px", height: "100px", backgroundColor: "lightblue" }}></div>
      <p>Width of div: {size}</p>
    </div>
  );
};

export default ComponentSize;
