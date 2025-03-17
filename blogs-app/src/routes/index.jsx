import { Routes, Route } from 'react-router';
import AuthRoute from '../components/AuthRoute';
import HomePage from '../pages/HomePage';
import LoginForm from '../components/LoginForm';
import NotFound from '../pages/NotFound';
import Blog from '../components/Blog';
import BlogsList from '../components/BlogsList';
import About from '../pages/About';
import RouterV7 from '../pages/RouterV7';
import BlogManagement from '../pages/BlogManagement';
const AppRoutes = () => {
  return (
    <Routes>
      {/* 独立登录页 */}
      <Route path="/login" element={<LoginForm />} />

      {/* 需要认证的路由 */}
      <Route element={<AuthRoute />}>
        <Route path="/" element={<HomePage />} >
          <Route index element={<BlogsList />} />
          <Route path="/blogs" element={<BlogsList />} />
          <Route path="/:userid/:id" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/routerv7" element={<RouterV7 />} />
          <Route path="/addblog" element={<BlogManagement />} />
        </Route>
      </Route>

      {/* 未匹配路由 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
