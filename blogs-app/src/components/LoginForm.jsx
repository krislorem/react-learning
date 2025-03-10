import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Layout, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginForm.css'; // 自定义样式文件
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router';

const { Content } = Layout;

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useLogin();
  const [submitting, setSubmitting] = useState(false);
  const onFinish = async (values) => {
    try {
      setSubmitting(true);
      await login(values); // 触发认证逻辑
      message.success('登录成功！正在跳转...', 1.5);
      navigate('/', { replace: true }); // 跳转至主页
    } catch (error) {
      // 错误处理优化
      form.setFields([
        { name: 'password', errors: [error.message] }
      ]);
      message.error(`登录失败: ${error.message}`, 2.5);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout className="login-container">
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col xs={20} sm={16} md={12} lg={8}>
            <div className="login-form-wrapper">
              <h2 style={{ textAlign: 'center', marginBottom: 24 }}>系统登录</h2>
              <Form
                form={form}
                name="login_form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                size="large"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱!' },
                    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'user4@example.com' }
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="邮箱"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: '请输入密码!' },
                    { min: 6, message: '密码至少6位' }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="密码"
                  />
                </Form.Item>

                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住我</Checkbox>
                  </Form.Item>
                  <a className="login-form-forgot" href="/forgot">
                    忘记密码?
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={submitting}
                    disabled={submitting}
                    className="login-form-button"
                  >
                    {submitting ? '登录中...' : '登录'}
                  </Button>
                </Form.Item>

                <div className="additional-actions">
                  没有账号? <a href="/register">立即注册</a>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginForm;
