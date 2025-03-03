import { UserContext } from "../../context/useUserContext";
import { useContext, useState } from "react";
// 2. 登录表单组件
const LoginForm = () => {
  const useUser = () => useContext(UserContext);
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里可以添加实际的登录验证逻辑
    if (username && password) {
      login(username);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        登录
      </button>
    </form>
  );
};
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  maxWidth: '300px',
  margin: '0 auto'
};

const inputStyle = {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ddd'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};
export default LoginForm
