import { Col, Row, Image, Card, Form, Input, Button, Spin } from 'antd';
import { login } from 'api/auth.api';
import { ApiErrorData } from 'api/http.api';
import { PageTitle } from 'components/common/PageTitle';
import { RedirectToRightLogin } from 'components/common/RedirectToRightLogin';
import { strings } from 'constants/globalStrings';
import { paths } from 'constants/paths';
import openNotification from 'hooks/notificationHook';
import { useAppDispatch } from 'hooks/reduxHooks';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doLogin } from 'store/slices/authSlice';
import { ApiError } from 'types';
import { LoginPayload, LoginResponse } from 'types/auth';
import 'styles/login-page.scss';

export const AdminLoginPage = () => {
  const dispatch = useAppDispatch();
  const [logging, setLogging] = useState(false);
  const navigate = useNavigate();

  const onLogin = async (values: LoginPayload) => {
    try {
      setLogging(true);
      const loginResult: LoginResponse = await login({
        loginPayload: values,
      });
      dispatch(doLogin(loginResult));
      navigate(`/${paths.admin.index}`);
    } catch (error) {
      const err = error as ApiError<ApiErrorData>;
      if (err.message) {
        openNotification({
          type: 'error',
          placement: 'top',
          message: strings.loginError,
          description: err.message,
        });
      } else {
        openNotification({
          type: 'error',
          placement: 'top',
          message: strings.loginError,
          description: strings.serverError,
        });
      }
    } finally {
      setLogging(false);
    }
  };

  return (
    <div id="admin-login-page">
      <PageTitle>Iniciar sesión</PageTitle>
      <Row justify="center" align="middle">
        <Col xs={24} className="g-logo-container">
          <Image src={`/logo.png`} preview={false} />
        </Col>
      </Row>
      <Row className="my-10">
        <Col xs={24}>
          <h2 className="tg-main-layout-title g-text-bold">
            Iniciar sesión como administrador
          </h2>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} md={12} xl={8}>
          <Spin
            spinning={logging}
            tip="Iniciando sesión..."
            className="login-spin"
          >
            <Card className="tg-main-layout-card">
              <Form
                layout="vertical"
                onFinish={onLogin}
                className="tg-main-layout-form"
                requiredMark={false}
              >
                <Form.Item
                  label="Correo electrónico"
                  hasFeedback
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa el correo electrónico',
                    },
                  ]}
                >
                  <Input type="text" data-cy="login-email-input" />
                </Form.Item>
                <Form.Item
                  label="Contraseña"
                  hasFeedback
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa la contraseña',
                    },
                  ]}
                >
                  <Input.Password data-cy="login-password-input" />
                </Form.Item>
                <div className="g-text-center">
                  <Link
                    to={`/${paths.forgotPassword.index}/${paths.forgotPassword.admin}`}
                    className="forgot-password-txt tg-link-text"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="mt-5 g-text-center">
                  <Button
                    type="primary"
                    className="tg-button tg-secondary-btn"
                    htmlType="submit"
                  >
                    Ingresar
                  </Button>
                </div>
              </Form>
            </Card>
          </Spin>
        </Col>
      </Row>
      <Row justify="center" className="mt-5">
        <Col xs={24}>
          <RedirectToRightLogin userType="student" />
        </Col>
      </Row>
      <Row justify="center" className="mt-5">
        <Col xs={24} md={12} lg={8} xl={6}></Col>
      </Row>
    </div>
  );
};
