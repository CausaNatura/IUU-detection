import MainLayout from 'components/layouts/MainLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { paths } from 'constants/paths';
import LandingPage from 'pages/LandingPage';
import UploadErrorsPage from 'pages/UploadErrorsPage';
import RequireAuth from './RequireAuth';
import AuthGuard from './AuthGuard';
import AdminLayout from 'components/layouts/AdminLayout';
import { NotFoundPage } from 'pages/NotFoundPage';
import { UnauthorizedPage } from 'pages/UnauthorizedPage';
import SimpleHeaderLayout from 'components/layouts/SimpleHeaderLayout';
import Logout from 'pages/auth/Logout';
import 'styles/global.scss';

const adminProtectedLayout = (userType: 'admin', role?: number) => {
  return (
    <RequireAuth>
      <AuthGuard userType={userType} role={role}>
        <AdminLayout />
      </AuthGuard>
    </RequireAuth>
  );
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.global.index} element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path={paths.forgotPassword.index}></Route>
          <Route path={paths.auth.index}>
            <Route path={paths.auth.logout} element={<Logout />} />
          </Route>
        </Route>
        <Route
          // Super-admin routes
          path={paths.admin.index}
          element={adminProtectedLayout('admin', 1)}
        >
          <Route
            path={paths.admin.uploadErrors}
            element={<UploadErrorsPage />}
          />
        </Route>
        <Route
          path={paths.global.index}
          element={<SimpleHeaderLayout />}
        ></Route>
        <Route
          path={paths.global.unauthorized}
          element={<UnauthorizedPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
