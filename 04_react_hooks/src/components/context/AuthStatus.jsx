import { UserContext } from "../../context/useUserContext";
import { useContext } from "react";
// 4. 显示登录状态的组件
const AuthStatus = () => {
  const useUser = () => useContext(UserContext);
  const { user } = useUser();

  return (
    <div style={statusStyle}>
      {user?.isLoggedIn
        ? `欢迎回来，${user.username}!`
        : '请先登录'}
    </div>
  );
};
const statusStyle = {
  fontSize: '1.2em',
  color: '#333'
};
export default AuthStatus
