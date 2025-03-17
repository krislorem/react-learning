import { useState } from 'react';
import BlogEditorForm from '../components/BlogEditorForm';
import { Divider, List, Button } from 'antd';
import { blogs as initialBlogs } from '../data/blogs';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const BlogManagement = () => {
  const [blogs, setBlogs] = useState(initialBlogs);

  const handleSubmit = (newBlog) => {
    setBlogs(prev => [
      ...prev,
      {
        ...newBlog,
        blog_id: prev.length + 1,
        likes: 0,
        favlists_count: 0,
        comment_count: 0
      }
    ]);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>新建博客</h2>
      <BlogEditorForm onSubmit={handleSubmit} />

      <Divider>最新博客列表</Divider>
      <List
        dataSource={blogs}
        renderItem={item => (
          <List.Item
            actions={[
              <Button
                key="edit-action"
                icon={<EditOutlined />}
              >
                编辑
              </Button>,
              <Button
                key="delete-action"
                icon={<DeleteOutlined />}
              >
                删除
              </Button>
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={`标签: ${item.tag.join(', ')}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default BlogManagement
