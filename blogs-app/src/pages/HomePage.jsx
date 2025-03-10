import { Layout, Row, Col } from 'antd';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router';
const { Header, Content } = Layout;

const HomePage = () => {
  return (
    <Layout className="main-layout">
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <NavBar />
      </Header>
      <Content style={{ padding: '0 25px', marginTop: 64 }}>
        <Row justify="center">
          <Col xs={24} md={18} lg={16}>
            <Outlet />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default HomePage;
