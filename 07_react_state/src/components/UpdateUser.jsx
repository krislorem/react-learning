import { useContext } from "react";
import UserContext from "../context/UserContext";
const UpdateUser = () => {
  const { user, setUser } = useContext(UserContext);
  const changeName = () => { setUser({ ...user, name: 'Bob' }); };
  return (
    <div>
      <button onClick={changeName}>更改用户名</button></div>
  );
}
export default UpdateUser
