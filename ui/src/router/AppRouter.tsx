import MainLayout from 'components/layouts/MainLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { paths } from 'constants/paths';
import LandingPage from 'pages/LandingPage';
import InstructionsPage from 'pages/students/InstructionsPage';
import StudentManager from 'pages/students/StudentManager';
import UploadErrorsPage from 'pages/UploadErrorsPage';
import SchoolManager from 'pages/schools/SchoolManager';
import { AdminLoginPage } from 'pages/auth/AdminLoginPage';
import { StudentLoginPage } from 'pages/auth/StudentLoginPage';
import { ForgotPasswordPage } from 'pages/auth/ForgotPasswordPage';
import RequireAuth from './RequireAuth';
import AuthGuard from './AuthGuard';
import AdminLayout from 'components/layouts/AdminLayout';
import { NotFoundPage } from 'pages/NotFoundPage';
import { UnauthorizedPage } from 'pages/UnauthorizedPage';
import { SetPasswordPage } from 'pages/auth/SetPasswordPage';
import StudentLayout from 'components/layouts/StudentLayout';
import SimpleHeaderLayout from 'components/layouts/SimpleHeaderLayout';
import Logout from 'pages/auth/Logout';
import QuestionnairePage from 'pages/questionnaires/QuestionnairePage';
import CreateQuestionnaire from 'pages/questionnaires/CreateQuestionnaire';
import NumeralsPage from 'pages/numerals/NumeralsPage';
import NumeralsManager from 'pages/numerals/NumeralsManager';
import 'styles/theme-globals.scss';
import { SavedAnswersPage } from 'pages/students/SavedAnswersPage';
import { AnswersFinderPage } from 'pages/answers/AnswersFinderPage';
import UserManagerPage from 'pages/users/UserManagerPage';
import { FrecuentQuestionsPage } from 'pages/faqs/FrecuentQuestionsPage';
import { FrequentQuestionsManager } from 'pages/faqs/FrecuentQuestionsManager';
import { ReportsManagerPage } from 'pages/reports/ReportsManagerPage';

const adminProtectedLayout = (userType: 'admin', role?: number) => {
  return (
    <RequireAuth>
      <AuthGuard userType={userType} role={role}>
        <AdminLayout />
      </AuthGuard>
    </RequireAuth>
  );
};

const studentProtectedLayout = (userType: 'student') => {
  return (
    <RequireAuth>
      <AuthGuard userType={userType}>
        <StudentLayout />
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
          <Route path={paths.login.index}>
            <Route path={paths.login.student} element={<StudentLoginPage />} />
            <Route path={paths.login.admin} element={<AdminLoginPage />} />
          </Route>
          <Route path={paths.forgotPassword.index}>
            <Route
              path={paths.forgotPassword.admin}
              element={<ForgotPasswordPage />}
            />
          </Route>
          <Route path={paths.auth.index}>
            <Route
              path={`${paths.admin.index}/${paths.auth.confirm}`}
              element={<SetPasswordPage />}
            />
            <Route path={paths.auth.logout} element={<Logout />} />
          </Route>
        </Route>
        <Route
          // Super-admin routes
          path={paths.admin.index}
          element={adminProtectedLayout('admin', 1)}
        >
          <Route path={paths.students.index} element={<StudentManager />} />
          <Route
            path={paths.admin.uploadErrors}
            element={<UploadErrorsPage />}
          />
          <Route path={paths.schools.index} element={<SchoolManager />} />
          <Route path={paths.answers.index} element={<AnswersFinderPage />} />
          <Route path={paths.admin.users} element={<UserManagerPage />} />
          <Route
            path={paths.questions.index}
            element={<FrequentQuestionsManager />}
          />
          <Route path={paths.reports.index} element={<ReportsManagerPage />} />
          <Route path={paths.questionnaires.index}>
            <Route
              path={paths.questionnaires.create}
              element={<CreateQuestionnaire />}
            />
          </Route>
          <Route path={paths.numerals.index} element={<NumeralsPage />} />
          <Route path={paths.numerals.manager} element={<NumeralsManager />} />
        </Route>
        <Route
          // Student protected routes
          element={studentProtectedLayout('student')}
          path={paths.students.index}
        >
          <Route
            path={paths.students.instructions}
            element={<InstructionsPage />}
          />
          <Route
            path={paths.students.questionnaire}
            element={<QuestionnairePage />}
          />
          <Route
            path={paths.students.savedAnswers}
            element={<SavedAnswersPage />}
          />
        </Route>
        <Route path={paths.global.index} element={<SimpleHeaderLayout />}>
          <Route
            path={paths.questions.index}
            element={<FrecuentQuestionsPage />}
          />
        </Route>
        <Route
          path={paths.global.unauthorized}
          element={<UnauthorizedPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
