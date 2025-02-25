import React from 'react';
import { Modal, Form, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './BookInput.css';

const { TextArea } = Input;

export default function BookInput({ visible, onSubmit, onCancel, initialValues }) {
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  return (
    <Modal
      title={initialValues ? "编辑图书" : "添加新图书"}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={values => onSubmit(values)}
      >
        <Form.Item
          label="书名"
          name="title"
          rules={[{ required: true, message: '请输入书名' }]}
        >
          <Input placeholder="请输入书名" />
        </Form.Item>

        <Form.Item
          label="作者"
          name="author"
          rules={[{ required: false, message: '请输入作者' }]}
        >
          <Input placeholder="请输入作者" />
        </Form.Item>

        <Form.Item
          label="出版社"
          name="press"
          rules={[{ required: false, message: '请输入出版社' }]}
        >
          <Input placeholder="请输入出版社" />
        </Form.Item>

        <Form.Item
          label="出版年份"
          name="year"
          rules={[
            { required: false, message: '请输入出版年份' },
            { pattern: /^[0-9]{4}/, message: '请输入有效年份' }
          ]}
        >
          <Input placeholder="请输入出版年份" />
        </Form.Item>

        <Form.Item
          label="图书简介"
          name="description"
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="图书封面"
          name="images"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: false, message: '请至少上传一张封面' }]}
        >
          <Upload
            listType="picture-card"
            multiple
            beforeUpload={() => false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
