import React from 'react'
import { Layout, Card } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Content } = Layout;
const RouterV7 = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '16px' }}>
        <Card
          title={<span><GlobalOutlined /> React Router V7 Docs</span>}
          styles={{ borderBottom: 0 }}
        >
          <iframe
            src="https://reactrouter.com/start/library/routing"
            style={{
              width: '100%',
              height: '80vh',
              border: '1px solid #f0f0f0',
              borderRadius: 8
            }}
          />
        </Card>
      </Content>
    </Layout>
  )
}

export default RouterV7
