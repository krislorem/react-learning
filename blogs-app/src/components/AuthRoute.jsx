import { Navigate, Outlet } from 'react-router';
import { useLogin } from '../hooks/useLogin';

const AuthRoute = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthRoute;
