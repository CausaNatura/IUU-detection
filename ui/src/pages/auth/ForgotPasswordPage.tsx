import { Col, Row, Image, Spin, Card, Form, Input, Button, Modal } from 'antd';
import { recoverPassword } from 'api/auth.api';
import { ApiErrorData } from 'api/http.api';
import { PageTitle } from 'components/common/PageTitle';
import { RedirectToRightLogin } from 'components/common/RedirectToRightLogin';
import { strings } from 'constants/globalStrings';
import { paths } from 'constants/paths';
import openNotification from 'hooks/notificationHook';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError } from 'types';
import { ForgotPasswordPayload } from 'types/auth';
import 'styles/forgot-password-page.scss';

export const ForgotPasswordPage = () => {
  const requestError = 'Error al enviar la solicitud';
  const navigate = useNavigate();
  const [requesting, setRequesting] = useState(false);
  const [successRequestModal, setSuccessRequestModal] = useState(false);

  const onRecoverPassword = async ({ email }: ForgotPasswordPayload) => {
    try {
      setRequesting(true);
      await recoverPassword({
        email,
      });
      setSuccessRequestModal(true);
    } catch (error) {
      const err = error as ApiError<ApiErrorData>;
      if (err.message) {
        openNotification({
          type: 'error',
          placement: 'top',
          message: requestError,
          description: err.message,
        });
      } else {
        openNotification({
          type: 'error',
          placement: 'top',
          message: requestError,
          description: strings.serverError,
        });
      }
    } finally {
      setRequesting(false);
    }
  };

  const successRequestModalOnOk = () => {
    setSuccessRequestModal(false);
    navigate(`/${paths.login.index}/${paths.login.admin}`);
  };

  return (
    <div id="admin-forgot-password-page">
      <PageTitle>Recuperar contraseña - Administrador</PageTitle>
      <Row justify="center" align="middle">
        <Col xs={24} className="g-logo-container">
          <Image src={`/logo.png`} preview={false} />
        </Col>
      </Row>
      <Row className="xl-my-10">
        <Col xl={24}>
          <h2 className="tg-main-layout-title">Recuperar contraseña</h2>
        </Col>
      </Row>
      <Row justify="center">
        <Col xl={8}>
          <Spin
            tip="Enviando solicitud..."
            className="login-spin"
            spinning={requesting}
          >
            <Card className="tg-main-layout-card">
              <p>Ingresa el correo que utilizas para iniciar sesión</p>
              <Form
                layout="vertical"
                onFinish={onRecoverPassword}
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
                <Row justify="center" className="xl-mt-5">
                  <Col xl={12}>
                    <Button
                      type="primary"
                      className="tg-button tg-secondary-btn"
                      htmlType="submit"
                    >
                      Recuperar contraseña
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Spin>
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
      <Modal
        open={successRequestModal}
        closable={false}
        footer={false}
        className="recover-password-modal"
      >
        <Row>
          <Col xl={24}>
            <p>
              Te enviamos un correo para restablecer tu contraseña. Por favor
              revisa tu correo electrónico.
            </p>
          </Col>
        </Row>
        <Row justify="end">
          <Col xl={{ pull: 1, span: 8 }}>
            <Button
              type="primary"
              className="ok-btn"
              onClick={successRequestModalOnOk}
            >
              Aceptar
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
