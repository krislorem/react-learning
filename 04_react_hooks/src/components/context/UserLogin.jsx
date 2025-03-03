// 1. 创建用户上下文
import React from 'react';
import LoginForm from './LoginForm';
import AuthStatus from './AuthStatus';
import { UserProvider } from './UserProvider';
import LogoutButton from './LogoutButton';


// 5. 应用整合
const UserLogin = () => {
  return (
    <UserProvider>
      <div style={appStyle}>
        <nav style={navStyle}>
          <AuthStatus />
          <LogoutButton />
        </nav>
        <main>
          <LoginForm />
        </main>
      </div>
    </UserProvider>
  );
};

// 样式配置
const appStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px'
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '40px',
  padding: '20px',
  backgroundColor: '#f5f5f5'
};



export default UserLogin;
