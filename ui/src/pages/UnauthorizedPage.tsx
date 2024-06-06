import { Button, Row, Col, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from 'components/common/PageTitle';

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle>Página no autorizada</PageTitle>
      <Row className="error-page px-10">
        <Col xs={24}>
          <div className="g-logo-container mb-10 md-mb-0">
            <Image src={`/logo.png`} preview={false} />
          </div>
          <div className="pt-5 md-pt-20">
            <Image src="{Image403}" preview={false} />
            <h2 className="title-error">403</h2>
            <h3 className="description">
              Lo sentimos, no estás autorizado a acceder a esta página
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
