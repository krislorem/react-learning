import React from 'react';
import { Layout, List, Typography, Row, Col } from 'antd';
import blogs from '../data/blog';
import { NavLink } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const BlogList = () => {
  return (
    <Content style={{ padding: '24px 50px' }}>
      <Row justify="center">
        <Col xs={24} md={18} lg={16}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
            Blog Articles
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={blogs}
            renderItem={(blog, index) => (
              <List.Item
                actions={[
                  <NavLink to={`/blog/${index}`} style={{ color: '#1890ff' }}>
                    Read more
                  </NavLink>
                ]}
              >
                <List.Item.Meta
                  title={
                    <NavLink to={`/blog/${index}`} style={{ fontSize: '16px' }}>
                      {blog.title}
                    </NavLink>
                  }
                  description={`Author: ${blog.author || 'Unknown'} | Date: ${blog.date || '--'}`}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default BlogList;
