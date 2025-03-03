import React, { useRef } from "react";
import Child1 from "./Child1";
// 导入 Child1 组件
// Parent1 组件，用于演示如何通过 ref 操控子组件 Child1 的 DOM 元素
const Parent1 = () => {
  // 使用 useRef Hook 创建一个 ref 对象，用于访问 Child1 组件
  const childRef = useRef();
  // 渲染组件，包括一个按钮和一个 Child1 子组件
  return (
    <div>
      {/* 按钮点击事件处理函数，调用 childRef.current.focus() 来设置 Child1 输入框的焦点 */}
      <button onClick={() => childRef.current.focus()}>
        Focus Child Input // 按钮文本</button>
      {/* 将 childRef 传递给 Child1 组件，以便在 Child1 内部通过 useImperativeHandle 暴露 focus 方法 */}
      <Child1 ref={childRef} /></div>);
};
export default Parent1
