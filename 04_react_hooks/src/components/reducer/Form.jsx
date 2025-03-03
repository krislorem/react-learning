import { useReducer } from "react";
// 定义一个 reducer 函数，用于管理表单的状态变化
const formReducer = (state, action) => {
  switch (action.type) {
    case "update":
      // 如果 action 类型是 "update"，更新 state 中对应的字段
      return { ...state, [action.name]: action.value };
    case "reset":
      // 如果 action 类型是 "reset"，重置 state 为初始值
      return { username: "", email: "" };
    default:
      // 如果 action 类型不匹配，返回当前状态不变
      returnstate;
  }
};
// Form 组件，使用 useReducer Hook 来管理表单的状态
const Form = () => {
  // 使用 useReducer Hook，传入 reducer 函数和初始状态，返回状态 state 和 dispatch 函数
  const [state, dispatch] = useReducer(formReducer, { username: "", email: "", });
  // 定义输入字段变化时的处理函数
  const handleChange = (e) => {
    // 派发 "update" 类型的动作，携带输入字段的名称和值
    dispatch({ type: "update", name: e.target.name, value: e.target.value });
  };
  // 定义表单提交时的处理函数
  const handleSubmit = (e) => {
    e.preventDefault();
    // 阻止表单默认提交行为
    alert(`提交成功！\n用户名: ${state.username}\n邮箱: ${state.email}`); dispatch({ type: "reset" });
    // 提交后重置表单
  };
  // 定义手动重置表单的处理函数
  const handleReset = () => {
    dispatch({ type: "reset" });
    // 派发 "reset" 类型的动作
  };
  // 渲染表单组件
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" name="username" value={state.username} onChange={handleChange} placeholder="Username" /></div><div>
        <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Email" /></div><div>
        <button type="submit">提交</button>
        <button type="button" onClick={handleReset}>重置</button></div></form>);
};
export default Form
