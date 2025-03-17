import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import AppRoutes from "./routes";
import './styles/nav.css';

const App = () => {
  return (
    <BrowserRouter>
      <nav className="nav-container">
        <div className="nav-content">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">文章列表</Link></li>
            <li><Link to="/create" className="nav-link">新建文章</Link></li>
            <li><Link to="/movies" className="nav-link">电影列表</Link></li>
          </ul>
        </div>
      </nav>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
