// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Layout.scss';
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { Icon } from '@iconify/react';
const Layout = ({ children }) => {
  return (
    <div className="app-container">
      {/* 顶部导航栏 */}
      <nav className="main-nav">
        <div className="logo">
          <Icon icon="devicon:react" style={{ transform: 'scale(1.8)' }}></Icon>
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
        </div>
      </nav>
      <ThemeSwitcher />

      {/* 内容区域 */}
      <main className="content-wrapper">
        <Outlet /> {/* 自动渲染子路由组件 */}
        {children} {/* 支持嵌套子组件 */}
      </main>

      {/* 底部信息栏 */}
      <footer className="app-footer">
        © 2025 Your Company. All rights reserved.
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
