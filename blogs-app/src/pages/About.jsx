import React from 'react';
import {
  Card,
  Typography,
  List,
  Avatar,
  Row,
  Col,
  Descriptions
} from 'antd';
import {
  MailOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  GithubOutlined,
  LinkOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// 团队成员数据
const teamMembers = [
  {
    name: '张三',
    role: '前端开发',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: '专注React生态，喜欢探索新技术'
  },
  {
    name: '李四',
    role: 'UI设计师',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: '追求极致用户体验，设计系统专家'
  }
];

const About = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Row gutter={[24, 24]}>
        {/* 项目介绍 */}
        <Col span={24}>
          <Card
            title={<Title level={3}>关于我们</Title>}
            bordered={false}
            style={{ background: '#f0f2f5' }}
          >
            <Paragraph>
              <Title level={4}>项目背景</Title>
              我们致力于打造现代化的Web应用解决方案，结合最新前端技术和最佳实践，为用户提供高效、可靠的产品体验。
            </Paragraph>
            <Paragraph>
              <Title level={4}>技术栈</Title>
              React + Ant Design + Vite + Node.js
            </Paragraph>
          </Card>
        </Col>

        {/* 团队成员 */}
        <Col span={24}>
          <Card
            title={
              <span>
                <TeamOutlined style={{ marginRight: 8 }} />
                核心团队
              </span>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={teamMembers}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.name}
                    description={
                      <>
                        <div>{item.role}</div>
                        <div style={{ color: '#666' }}>{item.bio}</div>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 联系方式 */}
        <Col xs={24} md={12}>
          <Card
            title="联系我们"
            style={{ background: '#fffbe6' }}
          >
            <Descriptions column={1}>
              <Descriptions.Item label={<MailOutlined />}>
                contact@example.com
              </Descriptions.Item>
              <Descriptions.Item label={<EnvironmentOutlined />}>
                中国，上海
              </Descriptions.Item>
              <Descriptions.Item label={<GithubOutlined />}>
                <a href="https://github.com/example">GitHub仓库</a>
              </Descriptions.Item>
              <Descriptions.Item label={<LinkOutlined />}>
                <a href="https://example.com">官方网站</a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* 产品数据 */}
        <Col xs={24} md={12}>
          <Card
            title="产品数据"
            style={{ background: '#f6ffed' }}
          >
            <Descriptions column={2}>
              <Descriptions.Item label="用户数">10万+</Descriptions.Item>
              <Descriptions.Item label="版本">v2.1.0</Descriptions.Item>
              <Descriptions.Item label="上线时间">2023-01-01</Descriptions.Item>
              <Descriptions.Item label="代码行数">50万+</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;
