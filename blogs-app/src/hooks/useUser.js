import { useLogin } from './useLogin';
import { blogs } from '../data/blogs'

export const useUser = () => {
  const { token } = useLogin();
  // 获取用户信息
  const getUserInfo = () => {
    const [email] = token?.split('|') || [];
    return blogs.find(u => u.author.email === email)?.author || {};
  };

  return { getUserInfo }
}
