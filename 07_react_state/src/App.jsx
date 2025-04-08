import UserProvider from "./components/UserProvider";
import UserProfile from "./components/UserProfile";
import UpdateUser from "./components/UpdateUser";
import Profile from "./components/Profile";
import CounterUseState from "./components/CounterUseState";
import TodoList from "./components/TodoList";
import CounterZustand from "./components/CounterZustand";
const App = () => {
  return (
    <>
      <Profile />
      <TodoList />
      <CounterUseState />
      <UserProvider>
        <UserProfile />
        <UpdateUser />
      </UserProvider>
      <CounterZustand />
    </>
  );
}
export default App
