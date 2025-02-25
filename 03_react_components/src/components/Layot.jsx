import { Layout, Menu, Carousel, Row, Col } from 'antd';
import { UserOutlined, SolutionOutlined } from '@ant-design/icons';
import CustomCard from './card/CustomCard';
const { Header, Content, Footer } = Layout;
const Layout1 = () => {
  const carouselImages = [
    'https://picsum.photos/800/300?1',
    'https://picsum.photos/800/300?2',
    'https://picsum.photos/800/300?3'
  ];
  return (
    <>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>用户注册</Menu.Item>
            <Menu.Item key="2" icon={<SolutionOutlined />}>信息展示</Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: '0 50px' }}>
          <Carousel autoplay style={{ margin: '20px 0' }}>
            {carouselImages.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`banner-${index}`}
                  style={{ width: '100%', height: 300, objectFit: 'cover' }}
                />
              </div>
            ))}
          </Carousel>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              {/* <RG /> */}
              <CustomCard
                cover="https://picsum.photos/400/200"
                avatar="https://randomuser.me/api/portraits/women/11.jpg"
                title="用户指南"
                content="欢迎使用我们的注册系统，请填写真实有效的个人信息以便我们为您提供更好的服务。"
              />
            </Col>

            <Col xs={24} md={8}>
              <CustomCard
                cover="https://picsum.photos/400/201"
                avatar="https://randomuser.me/api/portraits/women/12.jpg"
                title="用户指南"
                content="欢迎使用我们的注册系统，请填写真实有效的个人信息以便我们为您提供更好的服务。"
              />
            </Col>
            <Col xs={24} md={8}>
              <CustomCard
                cover="https://picsum.photos/400/202"
                avatar="https://randomuser.me/api/portraits/women/13.jpg"
                title="用户指南"
                content="欢迎使用我们的注册系统，请填写真实有效的个人信息以便我们为您提供更好的服务。"
              />
            </Col>
          </Row>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </>
  )
}
export default Layout1
