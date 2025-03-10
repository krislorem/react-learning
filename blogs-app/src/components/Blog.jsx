import { useParams, useNavigate } from 'react-router';
import { Alert, Flex, Tag, Row, Col, Avatar, Typography, Button, Card, Divider } from 'antd';
import { LikeOutlined, StarOutlined, LeftOutlined } from '@ant-design/icons';
import { blogs } from '../data/blogs';
import CherryEditor from './CherryEditor'
const { Title, Text } = Typography;
import { ErrorBoundary } from 'react-error-boundary';

// 错误边界组件
const EditorErrorFallback = () => (
  <div className="editor-error">
    <Alert
      message="编辑器加载失败"
      description="请尝试刷新页面或检查网络连接"
      type="error"
    />
  </div>
);
const Blog = () => {
  const { userid, id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find(b =>
    b.blog_id === Number(id) &&
    b.author.user_id === Number(userid)
  );

  return (
    <div className="blog-detail" style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Card
        style={{ marginBottom: 24 }}
        styles={{ padding: '16px 24px' }}
      >
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={16}>
            <Button
              type="text"
              icon={<LeftOutlined />}
              onClick={() => navigate(-1)}
            />
            <div>
              <Title level={4} style={{ margin: 0 }}>{blog.title}</Title>
              <Text type="secondary">{blog.category.join(' • ')}</Text>
            </div>
          </Flex>
          <Flex gap={8}>
            <Tag color="blue">阅读 {blog.views || 0}</Tag>
            <Tag color="green">评论 {blog.comment_count}</Tag>
          </Flex>
        </Flex>
      </Card>

      <Row gutter={24}>
        {/* 主内容区 */}
        <Col xs={24} md={18}>
          <ErrorBoundary FallbackComponent={EditorErrorFallback}>
            <CherryEditor initialValue={blog.content} isPreview={true} />
          </ErrorBoundary>
        </Col>

        {/* 侧边信息栏 */}
        <Col xs={24} md={6}>
          <Card title="作者信息">
            <Flex align="center" gap={16}>
              <Avatar size={56} src={blog.author.avatar} />
              <div>
                <Typography.Text strong>{blog.author.user_name}</Typography.Text>
                <Typography.Paragraph type="secondary">
                  注册时间：{new Date(blog.create_time).toLocaleDateString()}
                  <br />
                  最近活跃：{new Date(blog.update_time).toLocaleDateString()}
                </Typography.Paragraph>
              </div>
            </Flex>
            <Divider />
            <div className="statistics">
              <Tag icon={<LikeOutlined />} color="magenta">
                {blog.likes} 赞
              </Tag>
              <Tag icon={<StarOutlined />} color="gold">
                {blog.favlists_count} 收藏
              </Tag>
            </div>
            <Divider />
            <div className="tags">
              <h4>文章标签</h4>
              {blog.tag.map(t => (
                <Tag key={t} color="geekblue" style={{ marginBottom: 8 }}>
                  #{t}
                </Tag>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Blog;
