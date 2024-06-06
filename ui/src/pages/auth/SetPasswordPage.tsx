import { Col, Row, Image, Spin, Card, Form, Input, Button } from 'antd';
import { me, setNewPassword } from 'api/auth.api';
import { ApiErrorData } from 'api/http.api';
import { PageTitle } from 'components/common/PageTitle';
import { RedirectToRightLogin } from 'components/common/RedirectToRightLogin';
import { regexConstants } from 'constants/Regex';
import { strings } from 'constants/globalStrings';
import { paths } from 'constants/paths';
import openNotification from 'hooks/notificationHook';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { persistToken } from 'services/localStorage.service';
import { ApiError } from 'types';
import { NewPasswordFormData } from 'types/auth';
import { User } from 'types/user';

export const SetPasswordPage = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('t');
  const userType = query.get('usertype');
  const [savingPassword, setSavingPassword] = useState(false);
  const [user, setUser] = useState<User>();
  const [findUserError, setFindUserError] = useState(false);

  useEffect(() => {
    if (token && userType) {
      persistToken(token);
      me({
        isStudent: false,
      })
        .then((res: User) => {
          setUser(res);
        })
        .catch(() => {
          setFindUserError(true);
        });
    }
  }, [token, userType]);

  const onSetNewPassword = async (values: NewPasswordFormData) => {
    try {
      setSavingPassword(true);
      await setNewPassword({ newPassword: values.password });
      navigate(`/${paths.login.index}/${paths.login.admin}`);
      openNotification({
        type: 'success',
        placement: 'top',
        message: 'Contraseña guardada.',
        description: 'Inicia sesión con tu nueva contraseña.',
      });
    } catch (error) {
      const err = error as ApiError<ApiErrorData>;
      if (err.message) {
        openNotification({
          type: 'error',
          placement: 'top',
          message: strings.setPasswordErrorMsg,
          description: err.message,
        });
      } else {
        openNotification({
          type: 'error',
          placement: 'top',
          message: strings.setPasswordErrorMsg,
          description: strings.serverError,
        });
      }
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div id="set-password-page">
      <PageTitle>{`Nueva contraseña`}</PageTitle>
      <Row justify="center" align="middle">
        <Col xs={24} className="g-logo-container">
          <Image src={`/logo.png`} preview={false} />
        </Col>
      </Row>
      <Row className="xl-my-10">
        <Col xl={24}>
          <h2 className="tg-main-layout-title">Nueva contraseña</h2>
        </Col>
      </Row>
      <Row justify="center">
        <Col xl={8}>
          {user ? (
            <Spin
              spinning={savingPassword}
              tip="Guardando contraseña..."
              className="login-spin"
            >
              <Card className="tg-main-layout-card">
                <Form
                  layout="vertical"
                  onFinish={onSetNewPassword}
                  className="tg-main-layout-form"
                  requiredMark={false}
                >
                  <Form.Item
                    label="Nueva contraseña"
                    hasFeedback
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Ingresa la contraseña',
                      },
                      {
                        min: 6,
                        message:
                          'La contraseña debe tener al menos 6 caracteres',
                      },
                      {
                        pattern: regexConstants.password,
                        message: strings.passwordRulesMessage,
                      },
                    ]}
                  >
                    <Input.Password type="text" data-cy="login-email-input" />
                  </Form.Item>
                  <Form.Item
                    label="Confirma la contraseña"
                    hasFeedback
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Confirma la contraseña',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(`Las contraseñas no coinciden`)
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password data-cy="login-password-input" />
                  </Form.Item>
                  <Row justify="center" className="xl-mt-5">
                    <Col xl={10}>
                      <Button
                        type="primary"
                        className="tg-button tg-secondary-btn"
                        htmlType="submit"
                      >
                        Guardar contraseña
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Spin>
          ) : (
            <>
              {findUserError ? (
                <Card className="tg-main-layout-card">
                  <p className="set-password-page-error-txt">
                    Ocurrió un error al obtener los datos, por favor, inténtalo
                    de nuevo más tarde
                  </p>
                </Card>
              ) : (
                <Spin tip="Validando información...">
                  <Card className="tg-main-layout-card" />
                </Spin>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row justify="center" className="xl-mt-5">
        <Col xl={24}>
          <RedirectToRightLogin userType="student" />
        </Col>
      </Row>
      <Row justify="center" className="xl-mt-5">
        <Col xl={6}></Col>
      </Row>
    </div>
  );
};
