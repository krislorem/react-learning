import { useContext } from "react";
import UserContext from "../context/UserContext";
const UserProfile = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h2>个人资料</h2>
      <p>姓名: {user.name}</p><p>年龄: {user.age}</p></div>);
};
export default UserProfile
