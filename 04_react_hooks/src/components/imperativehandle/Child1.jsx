import { useImperativeHandle, forwardRef } from "react";

const Child1 = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    focus: () => {
      document.getElementById("child-input").focus();
    },
  }));

  return <input id="child-input" type="text" />;
});

export default Child1;
