import React, { useState, useCallback, useMemo } from 'react';
import { Layout, message } from 'antd';
import BookNav from '../BookNav';
import BookInput from '../BookInput';
import BookDetail from '../BookDetail';
import BookList from '../BookList'
import './BookApp.css';

const { Content } = Layout;

export default function BookApp() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // 图书提交处理
  const handleSubmit = useCallback((values) => {
    const newBook = {
      ...values,
      id: Date.now(),
      images: values.images.map(img => img.url || img.thumbUrl)
    };

    setBooks(prev => editingBook ?
      prev.map(b => b.id === editingBook.id ? newBook : b) :
      [...prev, newBook]
    );

    setInputVisible(false);
    setEditingBook(null);
    message.success(`图书${editingBook ? '更新' : '添加'}成功`);
  }, [editingBook]);

  // 搜索过滤逻辑
  const [searchMode, setSearchMode] = useState('title'); // title/all

  const filteredBooks = useMemo(() => {
    return searchTerm ?
      books.filter(book =>
        searchMode === 'all' ?
          Object.values(book).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase())) :
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) :
      books;
  }, [books, searchTerm, searchMode]);

  return (
    <Layout className="book-app">
      <BookNav
        onAdd={() => setInputVisible(true)}
        onSearch={setSearchTerm}
        onReset={() => setSearchTerm('')}
        hasSearchTerm={!!searchTerm}
      />

      <BookInput
        visible={inputVisible}
        onCancel={() => {
          setInputVisible(false);
          setEditingBook(null);
        }}
        onSubmit={handleSubmit}
        initialValues={editingBook}
      />

      <BookDetail
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      <Content className="content">
        <BookList
          books={filteredBooks}
          onDelete={(id) => {
            setBooks(prev => prev.filter(b => b.id !== id));
            message.success('图书删除成功');
          }}
          onEdit={book => {
            setEditingBook(book);
            setInputVisible(true);
          }}
          onView={setSelectedBook}
        />
      </Content>
    </Layout>
  );
}
