import React, { useState, useDebugValue } from "react";
function useCustomHook(value) {
  useDebugValue(value ? "Active" : "Inactive");
  return value;
}
const App1 = () => {
  const [isActive, setIsActive] = useState(false);
  useCustomHook(isActive);
  return (
    <>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Deactivate" : "Activate"}
      </button>
    </>
  );
};
export default App1
