import { UserContext } from "../../context/useUserContext";
import { useContext } from "react";
// 3. 登出按钮组件
const LogoutButton = () => {
  const useUser = () => useContext(UserContext);
  const { user, logout } = useUser();

  return user?.isLoggedIn ? (
    <button onClick={logout} style={buttonStyle}>
      登出 ({user.username})
    </button>
  ) : null;
};


const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};


export default LogoutButton
