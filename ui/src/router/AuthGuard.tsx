import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/reduxHooks';
import { paths } from 'constants/paths';
import { User } from '@sentry/react';

interface RequirePermissionProps {
  children: React.ReactNode;
  userType: 'admin' | 'student';
  role?: number;
}
const AuthGuard = ({ children, userType, role }: RequirePermissionProps) => {
  const { user } = useAppSelector((state) => state.auth);
  if (!user || !user.token) {
    return <Navigate to="/" replace />;
  }
  if (
    (userType === 'admin' && user.userType !== 'administrador') ||
    (userType === 'student' && user.userType !== 'alumno') ||
    (userType === 'admin' &&
      role &&
      (!(user as User).role || role < (user as User).role))
  ) {
    return <Navigate to={`/${paths.global.unauthorized}`} replace />;
  }
  return children;
};

export default AuthGuard;
