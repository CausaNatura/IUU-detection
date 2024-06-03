import { Col, Row } from 'antd';
import { paths } from 'constants/paths';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface RedirectToRightLoginProps {
  userType: 'admin' | 'student';
}

export const RedirectToRightLogin = ({
  userType,
}: RedirectToRightLoginProps) => {
  const [loginURL, setLoginURL] = useState<string>();

  useEffect(() => {
    const url = `/${paths.login.index}/${userType === 'admin' ? paths.login.admin : paths.login.student}`;
    setLoginURL(url);
  }, [userType]);
  return (
    <Row justify="center">
      <Col xs={24} className="g-text-center">
        {loginURL && (
          <p className="tg-redirect-login-txt g-text-bold">
            ¿Eres {userType === 'admin' ? 'administrador' : 'alumno'}?
            <Link to={loginURL} className="tg-link-text ml-1">
              Inicia sesión aquí
            </Link>
          </p>
        )}
      </Col>
    </Row>
  );
};
