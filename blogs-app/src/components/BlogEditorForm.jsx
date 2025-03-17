import { Form, Input, Button, Select, message } from 'antd';
import CherryEditor from './CherryEditor';
import { useUser } from '../hooks/useUser'
import { useRef } from 'react';
const { Option } = Select;

const BlogEditorForm = ({ onSubmit }) => {
  const editorRef = useRef(null);
  const { getUserInfo } = useUser();
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinish={(values) => {
        // 整合编辑器内容
        const finalData = {
          ...values,
          content: editorRef.current?.getValue(),
          author: getUserInfo(),
          create_time: new Date().toISOString()
        }
        onSubmit(finalData)
      }}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input placeholder="请输入博客标题" />
      </Form.Item>

      <Form.Item
        label="内容"
        name="content"
        required>
        <CherryEditor
          initialValue={form.getFieldValue('content')}
          isPreview={false}
          ref={editorRef}
        />
      </Form.Item>

      <Form.Item
        label="标签"
        name="tag"
        rules={[{ type: 'array' }]}
      >

        <Select mode="tags" placeholder="选择或输入标签">
          {['js', 'react', 'antd', 'router'].map(tag => (
            <Option key={tag}>{tag}</Option>
          ))}
        </Select>

      </Form.Item>

      <Form.Item
        label="分类"
        name="category"
        rules={[{ required: true, message: '请选择分类' }]}
      >
        <Select placeholder="选择分类">
          <Option value="react">React技术栈</Option>
          <Option value="vue">Vue生态</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          发布博客
        </Button>
      </Form.Item>
    </Form>
  );
};
export default BlogEditorForm
