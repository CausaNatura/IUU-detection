import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/reduxHooks';
import { WithChildrenProps } from 'types/index';

const RequireAuth = ({ children }: WithChildrenProps) => {
  const token = useAppSelector((state) => state.auth.token);
  return token ? <>{children}</> : <Navigate to="/" replace />;
};

export default RequireAuth;
