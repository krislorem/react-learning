import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 执行登录操作
    navigate("/dashboard", { state: { username: "张三" } });
  };
  return (
    <div>
      <h2>登录页面</h2>
      <button onClick={handleLogin}>登录</button>
    </div>
  );
};

export default Login;
