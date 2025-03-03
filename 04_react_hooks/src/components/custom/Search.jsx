import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
// 导入自定义的 useDebounceHook
// Search 组件，用于创建一个搜索输入框，并将输入值传递给父组件处理
const Search = ({ onSearch }) => {
  // 使用 useState Hook 创建一个名为 input 的状态变量，用于存储输入框的值
  const [input, setInput] = useState("");
  // 使用 useDebounce Hook 创建一个 debouncedInput 变量，它将在输入停止后的 300毫秒内更新
  const debouncedInput = useDebounce(input, 300);
  // 使用 useEffect Hook 来处理副作用操作，即在 debouncedInput 更新后执行搜索
  useEffect(() => {
    // 如果 debouncedInput 存在（即输入框非空），调用父组件传递的 onSearch 函数
    if (debouncedInput) { onSearch(debouncedInput); }
  }, [debouncedInput, onSearch]);
  // 依赖数组，当 debouncedInput 或 onSearch 发生变化时执行 effect
  // 渲染组件，包括一个输入框，输入框的值绑定到 input 状态，当输入框的值改变时，通过 setInput 函数更新状态
  return (<input type="text" value={input} onChange={(e) => setInput(e.target.value)}
    // 输入框值改变时，更新 input 状态
    placeholder="Search..."
  // 输入框的占位符文本
  />);
};
export default Search
