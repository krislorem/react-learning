import UserProfie from "./UserProfile";
import { UserContext1 } from "../../context/UserContext";

const UserPage = () => {
  const user = { name: '张三' }
  return (
    <UserContext1.Provider value={user}>
      <UserProfie />
    </UserContext1.Provider>
  )
}

export default UserPage
