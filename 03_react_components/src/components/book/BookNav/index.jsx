import React, { useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { AppstoreAddOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import './BookNav.css';

export default function BookNav({ onAdd, onSearch, onReset, hasSearchTerm }) {
  const [searchValue, setSearchValue] = useState('');

  // 防抖搜索处理
  const handleSearch = useMemo(() =>
    debounce(value => {
      onSearch(value);
    }, 300)
    , [onSearch]);

  return (
    <header className="book-nav">
      <div className="nav-brand">
        <AppstoreAddOutlined className="nav-icon" />
        <span className="nav-title">图书管理系统</span>
      </div>

      <div className="nav-controls">
        <Button
          type="primary"
          icon={<AppstoreAddOutlined />}
          onClick={onAdd}
        >
          添加图书
        </Button>

        {hasSearchTerm && (
          <Button
            icon={<SyncOutlined />}
            onClick={() => {
              setSearchValue('');
              onReset();
            }}
          >
            重置
          </Button>
        )}

        <Input
          placeholder="搜索图书..."
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={e => {
            const val = e.target.value;
            setSearchValue(val);
            if (val === "") onSearch("");
            else handleSearch(val);
          }}
          className="search-input"
          allowClear
        />
      </div>
    </header>
  );
}
