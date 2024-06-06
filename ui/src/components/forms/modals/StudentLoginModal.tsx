import { Button } from 'antd';
import { ModalComponent } from 'components/common/ModalComponent';
import { BasicModalProps } from 'types/components';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import openNotification from 'hooks/notificationHook';
import { GoogleResponse } from 'types/auth';
import { jwtDecode } from 'jwt-decode';
import { Student } from 'types/student';
import { ApiError } from 'types';
import { ApiErrorData } from 'api/http.api';
import { ShowErrorMessage } from 'hooks/GetErrorMessage';
import { errorStrings } from 'constants/globalStrings';
import { studentSigin } from 'api/student.api';
import { useAppDispatch } from 'hooks/reduxHooks';
import { doLogin } from 'store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { paths } from 'constants/paths';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from 'config/authConfig';
import 'styles/students.scss';

interface StudentLoginModalProps extends BasicModalProps {
  student: Student;
}

export const StudentLoginModal = ({
  open,
  onOk,
  onCancel,
  student,
}: StudentLoginModalProps) => {
  const { ModalForm } = ModalComponent();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { instance } = useMsal();

  const processGoogleResponse = (response: CredentialResponse) => {
    if (response && response.credential) {
      const decryptedResponses: GoogleResponse = jwtDecode(response.credential);
      if (!decryptedResponses.email) {
        openNotification({
          type: 'error',
          message: '¡Error!',
          description: 'El correo electrónico no es válido',
        });
      }
      signin(decryptedResponses.email);
    }
  };

  const onMicrosoftLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then((e) => {
        signin(e.account.username);
      })
      .catch((e: Error) => {
        if (e.message !== 'user_cancelled: User cancelled the flow.') {
          openNotification({
            type: 'error',
            message: '¡Error!',
            description: 'No fue posible iniciar sesión con Microsoft',
          });
        }
      });
  };

  const signin = async (studentEmail: string) => {
    try {
      if (student && studentEmail) {
        const authenticatedStudent = await studentSigin({
          _id: student._id,
          email: studentEmail,
        });
        dispatch(
          doLogin({
            type: 'student',
            token: authenticatedStudent.token!,
            user: authenticatedStudent,
          })
        );
        navigate(`/${paths.students.index}/${paths.students.instructions}`);
      }
    } catch (error) {
      const err = error as ApiError<ApiErrorData>;
      ShowErrorMessage({
        status: err.statusCode,
        notFound: errorStrings.student.search,
      });
    }
  };
  return (
    <ModalForm
      title="Selecciona el correo con el que te quieras registrar"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={600}
    >
      <div className="g-text-center g-login-microsoft mt-4">
        <Button
          icon={<i className="bx bxl-windows" />}
          type="primary"
          onClick={onMicrosoftLogin}
        >
          Iniciar sesión con Microsoft
        </Button>
      </div>
      <div className="mt-2 login-google">
        <GoogleLogin
          onSuccess={(e) => processGoogleResponse(e)}
          onError={() => {
            openNotification({
              type: 'error',
              message: 'Error al iniciar sesión con Google',
              description: 'No fue posible iniciar sesión con Google.',
            });
          }}
          useOneTap
        />
      </div>
    </ModalForm>
  );
};
