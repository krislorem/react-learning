import { useContext } from "react";
import { UserContext1 } from "../../context/UserContext";

const UserProfie = () => {
  const user = useContext(UserContext1)
  return <div>欢迎你, {user.name}!</div>
}
export default UserProfie
