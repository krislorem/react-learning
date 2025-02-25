import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import './BookItem.css';

export default function BookItem({ book, onEdit, onDelete, onView }) {
  return (
    <div className="book-item-actions">
      <Button
        icon={<EyeOutlined />}
        onClick={() => onView(book)}
        title="查看详情"
      />
      <Button
        icon={<EditOutlined />}
        onClick={() => onEdit(book)}
        title="编辑"
      />
      <Button
        icon={<DeleteOutlined />}
        onClick={() => onDelete(book.id)}
        danger
        title="删除"
      />
    </div>
  );
}

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};
