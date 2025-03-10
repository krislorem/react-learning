import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { List, Card, Tag, Pagination, Avatar, Space } from 'antd';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import { blogs } from '../data/blogs';

const BlogsList = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // 生成动态路径（适配路由结构 /:userid/:id）
  const generateBlogPath = (blog) => `/${blog.author.user_id}/${blog.blog_id}`;

  return (
    <div className="blogs-container" style={{
      padding: '24px 48px', // 增加容器外间距
      maxWidth: 1200,
      margin: '0 auto'
    }}>
      <List
        grid={{ gutter: 24, column: 1 }} // 单列布局，间距24px
        dataSource={blogs.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        renderItem={(blog) => (
          <List.Item>
            <Link to={generateBlogPath(blog)} state={{ from: location }}>
              <Card
                hoverable
                cover={
                  <div
                    className="blog-cover"
                    style={{
                      padding: 12,
                      background: '#f0f2f5',
                      minHeight: 100,
                      overflow: 'hidden'
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 50) }}
                  />
                }
                actions={[
                  <IconText
                    icon={<LikeOutlined style={{ color: '#eb2f96' }} />}
                    text={blog.likes}
                    key="likes"
                  />,
                  <IconText
                    icon={<StarOutlined style={{ color: '#faad14' }} />}
                    text={blog.favlists_count}
                    key="stars"
                  />
                ]}
              >
                <Card.Meta
                  avatar={<Avatar src={blog.author.avatar} size={48} />}
                  title={
                    <span style={{
                      fontSize: 18,
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {blog.title}
                    </span>
                  }
                  description={
                    <Space direction="vertical" size={4}>
                      <Tag
                        color="geekblue"
                        style={{ marginRight: 0, borderRadius: 12 }}
                      >
                        {blog.category.join(' • ')}
                      </Tag>
                      <div style={{
                        color: '#8c8c8c',
                        display: 'flex',
                        gap: 12,
                        fontSize: 12
                      }}>
                        <span>{new Date(blog.create_time).toLocaleDateString()}</span>
                        <span>·</span>
                        <span>{blog.author.user_name}</span>
                      </div>
                    </Space>
                  }
                />
              </Card>
            </Link>
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={blogs.length}
        onChange={setCurrentPage}
        style={{
          marginTop: 32,
          display: 'flex',
          justifyContent: 'center'
        }}
        showQuickJumper
        showSizeChanger={false}
      />
    </div>
  );
};

const IconText = ({ icon, text }) => (
  <Space>
    {icon}
    <span style={{ fontWeight: 500 }}>
      {text > 1000 ? `${(text / 1000).toFixed(1)}k` : text}
    </span>
  </Space>
);

export default BlogsList;
