import { Result, Button, Row, Col, Space, Typography } from 'antd';
import { Link } from 'react-router';
import { RocketTwoTone } from '@ant-design/icons';
import './NotFound.css';

const { Title, Paragraph } = Typography;

const NotFound = () => {
  return (
    <Row justify="center" align="middle" className="not-found-container">
      <Col xs={24} md={18} lg={12}>
        <Result
          status="404"
          icon={<RocketTwoTone twoToneColor="#eb2f96" spin />}
          title={
            <Title level={2} style={{ color: '#1890ff' }}>
              页面迷失在太空
            </Title>
          }
          subTitle={
            <Space direction="vertical" size="middle">
              <Paragraph type="secondary" strong>
                错误代码：404 - 黑洞吞噬了目标页面
              </Paragraph>
              <Paragraph>
                可能原因：
                <ul className="reason-list">
                  <li>🚀 页面已被外星文明转移</li>
                  <li>🛸 星际导航坐标输入错误</li>
                  <li>🌌 空间折叠导致路径失效</li>
                </ul>
              </Paragraph>
            </Space>
          }
          extra={
            <Button
              type="primary"
              size="large"
              shape="round"
              icon={<RocketTwoTone />}
            >
              <Link to="/">启动曲速引擎返回母星</Link>
            </Button>
          }
        />
      </Col>
    </Row>
  );
};

export default NotFound;
