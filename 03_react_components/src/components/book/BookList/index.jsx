import React, { useState } from 'react';
import { Table, Image, Button, Empty } from 'antd';
import { LeftOutlined, RightOutlined, FileSearchOutlined } from '@ant-design/icons';
import BookItem from '../BookItem';
import './BookList.css';

export default function BookList({ books, onDelete, onEdit, onView }) {
  const [imageIndex, setImageIndex] = useState({});

  // 切换图片
  const handleImageChange = (id, direction) => {
    setImageIndex(prev => {
      const currentIndex = prev[id] || 0;
      const totalImages = books.find(book => book.id === id)?.images?.length || 0;
      let newIndex = currentIndex;

      if (direction === 'left') {
        newIndex = (currentIndex - 1 + totalImages) % totalImages;
      } else if (direction === 'right') {
        newIndex = (currentIndex + 1) % totalImages;
      }

      return { ...prev, [id]: newIndex };
    });
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 55,
    },
    {
      title: '预览',
      dataIndex: 'images',
      key: 'images',
      width: 100,
      render: (images, record) => {
        const currentIndex = imageIndex[record.id] || 0;
        const totalImages = images?.length || 0;

        return (
          <div className="image-container">
            {totalImages > 0 && (
              <>
                {totalImages > 1 && (
                  <Button
                    icon={<LeftOutlined />}
                    onClick={() => handleImageChange(record.id, 'left')}
                    className="arrow-button left-arrow"
                  />
                )}
                <Image
                  src={images[currentIndex]}
                  alt="封面"
                  className="book-cover"
                />
                {totalImages > 1 && (
                  <Button
                    icon={<RightOutlined />}
                    onClick={() => handleImageChange(record.id, 'right')}
                    className="arrow-button right-arrow"
                  />
                )}
              </>
            )}
          </div>
        );
      }
    },
    {
      title: '书名',
      dataIndex: 'title',
      key: 'title',
      width: 100,
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: 80,
    },
    {
      title: '出版社',
      dataIndex: 'press',
      key: 'press',
      width: 100,
    },
    {
      title: '出版年份',
      dataIndex: 'year',
      key: 'year',
      width: 100,
    },
    {
      title: '简介',
      dataIndex: 'description',
      key: 'description',
      width: 100,
    },
    {
      title: '操作',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <BookItem
          book={record}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      )
    }
  ];

  return (
    <div className="book-list-container">
      <Table
        columns={columns}
        dataSource={books}
        rowKey="id"
        bordered
        pagination={{
          pageSize: 10, // 默认每页10条
          showSizeChanger: true, // 显示页码切换器
          pageSizeOptions: ['10', '20', '50', '100'], // 可选条数
          showTotal: total => `共 ${total} 本图书` // 显示总数
        }}
        scroll={{ y: 400 }}
        locale={{
          emptyText: (
            <div className="custom-empty">
              <FileSearchOutlined className="empty-icon" />
              <p className="empty-text">没有找到相关图书</p>
            </div>
          )
        }}
      />
    </div>
  );
}
