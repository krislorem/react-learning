import { Dropdown, Menu, Avatar, Button, message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router';
import { useLogin } from '../hooks/useLogin';
import { useUser } from '../hooks/useUser';
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  SettingOutlined
} from '@ant-design/icons';
const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoggedIn, logout } = useLogin();
  const { getUserInfo } = useUser();
  // 登出处理
  const handleLogout = () => {
    logout();
    message.success('已退出登录');
    navigate('/login', { replace: true });
  };

  const items = [
    {
      key: 'profile',
      label: (
        <div className="user-card" style={{ minWidth: 200 }}>
          <Avatar
            src={getUserInfo().avatar}
            size={64}
            icon={<UserOutlined />}
          />
          <div style={{ marginLeft: 12 }}>
            <h4 style={{ margin: 0 }}>{getUserInfo().user_name}</h4>
            <p style={{ color: '#666', fontSize: 12 }}>{getUserInfo().email}</p>
          </div>
        </div>
      ),
      style: { pointerEvents: 'none' }
    },
    { type: 'divider' },
    {
      key: 'home',
      label: <Link to="/">个人主页</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: 'settings',
      label: <Link to="/settings"> 账户设置</Link>,
      icon: <SettingOutlined />,
    },
    { type: 'divider' },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      style: { color: '#ff4d4f' }
    }
  ]

  return (
    <div style={{ background: '#001529', padding: '0 24px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* 左侧导航 */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
          items={[
            { label: <Link to="/">首页</Link>, key: '/' },
            { label: <Link to="/about">关于</Link>, key: '/about' },
            { label: <Link to="/routerv7">组件库</Link>, key: '/routerv7' },
            { label: <Link to="/addblog">创建Blog</Link>, key: '/addblog' }
          ]}
        />

        {/* 右侧用户菜单 */}
        <Dropdown
          menu={{ items }}
          trigger={['hover', 'click']}
          placement="bottomRight"
        >
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', cursor: 'pointer' }}>
            <Avatar
              src={isLoggedIn ? getUserInfo().avatar : null}
              icon={!isLoggedIn && <UserOutlined />}
              style={{ marginRight: 8 }}
            />
            <span style={{ color: 'white' }}>
              {isLoggedIn ? getUserInfo().user_name : '未登录'}
            </span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

// 自定义下拉菜单样式
const styles = `
  .custom-dropdown {
    min-width: 240px !important;
    .ant-dropdown-menu-item {
      padding: 12px 24px;
      .anticon {
        margin-right: 12px;
      }
    }
    .ant-dropdown-menu-item-divider {
      margin: 8px 0;
    }
  }
`;

export default NavBar;
