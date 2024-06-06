import { Button, Row, Col, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'styles/not-found-unauthorized-page.scss';
import Image404 from 'assets/icn-404.svg';
import { PageTitle } from 'components/common/PageTitle';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle>Página no encontrada</PageTitle>
      <Row className="error-page px-10">
        <Col xs={24}>
          <div className="g-logo-container mb-10 md-mb-0">
            <Image src={`/logo.png`} preview={false} />
          </div>
          <div className="pt-5 md-pt-20">
            <Image src={Image404} preview={false} />
            <h2 className="title-error">404</h2>
            <h3 className="description">
              Lo sentimos, la página que buscas no existe.
            </h3>
            <Button
              type="primary"
              className="tg-button tg-secondary-btn"
              onClick={() => {
                navigate(-1);
              }}
            >
              Regresar
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};
