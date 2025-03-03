// 1. 创建用户上下文
import { createContext } from 'react';

export const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
});
