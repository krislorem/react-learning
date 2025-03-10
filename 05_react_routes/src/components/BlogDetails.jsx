import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Layout,
  Typography,
  Card,
  Image,
  Tag,
  Button,
  Row,
  Col,
  Space,
  Statistic
} from 'antd'
import { ArrowLeftOutlined, EyeOutlined, HeartOutlined, StarOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import blogs from '../data/blog'

const { Content } = Layout
const { Title, Paragraph } = Typography

const BlogDetails = () => {
  const { blogIndex } = useParams()
  const blog = blogs[blogIndex]

  return (
    <Content style={{ padding: '24px 50px', minHeight: '100vh' }}>
      <Row justify="center">
        <Col xs={24} md={22} lg={20} xl={18}>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            style={{ marginBottom: 16 }}
          >
            <Link to="/">返回博客列表</Link>
          </Button>

          <Card
            bordered={false}
            cover={
              <Image
                alt={blog.title}
                src={blog.image}
                preview={false}
                style={{ maxHeight: 400, objectFit: 'cover' }}
              />
            }
          >
            <Title level={1} style={{ marginBottom: 8 }}>
              {blog.title}
            </Title>

            <Space size="middle" style={{ marginBottom: 24 }}>
              <Tag color="geekblue">{blog.author || '匿名作者'}</Tag>
              <Tag color="cyan">{blog.date || '未知日期'}</Tag>
              {blog.tags?.map(tag => (
                <Tag key={tag} color="processing">{tag}</Tag>
              ))}
            </Space>

            <Row gutter={16} style={{ marginBottom: 32 }}>
              <Col>
                <Statistic
                  prefix={<EyeOutlined />}
                  title="阅读量"
                  value={blog.views}
                />
              </Col>
              <Col>
                <Statistic
                  prefix={<StarOutlined />}
                  title="收藏数"
                  value={blog.favorites}
                />
              </Col>
              <Col>
                <Statistic
                  prefix={<HeartOutlined />}
                  title="点赞数"
                  value={blog.likes}
                />
              </Col>
            </Row>

            <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
              {blog.content}
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </Content>
  )
}

export default BlogDetails
