import React, { useState } from 'react';
import { Modal, Image, Carousel, Descriptions, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './BookDetail.css';

export default function BookDetail({ book, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 切换图片
  const handleImageChange = (direction) => {
    const totalImages = book?.images?.length || 0;
    if (direction === 'left') {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    } else if (direction === 'right') {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }
  };

  return (
    <Modal
      title="图书详情"
      open={!!book}
      onCancel={onClose}
      footer={null}
      width={800}
      className="book-detail-modal"
    >
      {book && (
        <div className="detail-content">
          {/* 图片预览区域 */}
          <div className="image-preview">
            {book.images.length > 1 && (
              <Button
                icon={<LeftOutlined />}
                onClick={() => handleImageChange('left')}
                className="arrow-button left-arrow"
              />
            )}
            <Image
              src={book.images[currentImageIndex]}
              alt="预览"
              className="detail-image"
            />
            {book.images.length > 1 && (
              <Button
                icon={<RightOutlined />}
                onClick={() => handleImageChange('right')}
                className="arrow-button right-arrow"
              />
            )}
          </div>

          {/* 详情内容 */}
          <Descriptions column={1} className="detail-info">
            <Descriptions.Item label="书名">{book.title}</Descriptions.Item>
            <Descriptions.Item label="作者">{book.author}</Descriptions.Item>
            <Descriptions.Item label="出版社">{book.press}</Descriptions.Item>
            <Descriptions.Item label="出版年份">{book.year}</Descriptions.Item>
            <Descriptions.Item label="简介">
              <div className="description-text">{book.description}</div>
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Modal>
  );
}
