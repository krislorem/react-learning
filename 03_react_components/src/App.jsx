import ParentComponent from "./components/parent/ParentComponent";
import Layout1 from "./components/Layot";
import BookApp from "./components/book/BookApp";
import Card from "./components/card/Card";
import { FiUser } from 'react-icons/fi';
import './App.css'
const App = () => {
  return (
    <>
      {/* <ParentComponent /> */}
      {/* <Layout1 /> */}
      <BookApp />
      {/* <Card hoverable>
        <Card.Header>
          <FiUser size={18} />
          用户信息
        </Card.Header>

        <Card.Body>
          <p>姓名：张三</p>
          <p>邮箱：zhangsan@example.com</p>
        </Card.Body>

        <Card.Footer>
          <button className="primary-btn">编辑</button>
          <button className="danger-btn">删除</button>
        </Card.Footer>
      </Card> */}
    </>
  );
};

export default App;
