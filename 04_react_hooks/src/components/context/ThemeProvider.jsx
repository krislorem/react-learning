import { useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
// ThemeProvider 组件，用于包裹应用中需要访问主题的部分，它通过 Provider 组件向其子组件提供 theme 和 setTheme
const ThemeProvider = ({ children }) => {
  // 使用 useState Hook 创建一个 state 来存储当前主题，默认主题设置为 "light"（亮色模式）
  const [theme, setTheme] = useState("light");
  // 渲染 Provider 组件，并传递 theme 和 setTheme 作为 value 属性，这样，Provider 下的所有子组件都可以访问和修改主题
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>);
};
export default ThemeProvider
