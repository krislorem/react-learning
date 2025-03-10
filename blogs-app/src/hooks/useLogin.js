import { useState, useEffect } from 'react';
import { credentials } from '../data/credentials';

const TOKEN_KEY = 'auth_token';

export const useLogin = () => {
  // 状态管理：Token 和登录状态
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Token 持久化与同步
  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      setIsLoggedIn(false);
    }
  }, [token]);

  // 新增本地数据验证逻辑
  const validateCredentials = (input) => {
    const user = credentials.find(
      user => user.email === input.email && user.password === input.password
    );
    return user || null; // 返回完整用户信息
  };

  // 登录操作（模拟API请求）
  const login = async (input) => {
    try {
      const isValid = validateCredentials(input);
      if (!isValid) throw new Error('邮箱或密码错误');

      // 模拟生成带时间戳的 token
      const mockToken = `${input.email}|${Date.now()}`;
      setToken(mockToken);
      return { success: true, isValid };
    } catch (error) {
      console.error('登录失败:', error);
      throw error; // 抛出错误供组件捕获
    }
  };

  // 登出操作
  const logout = () => setToken('');

  return { token, isLoggedIn, login, logout };
};
