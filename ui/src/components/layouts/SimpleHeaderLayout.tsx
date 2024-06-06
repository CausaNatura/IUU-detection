import { Layout, Image, Row, Col, Button } from 'antd';
import { Outlet } from 'react-router-dom';
import { Content, Header } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';
import { paths } from '../../constants/paths';

const SimpleHeaderLayout = () => {
  return (
    <Layout className="tg-simple-layout-container">
      <Header className="header py-1">
        <Row className="header-container pb-5 md-pb-0">
          <Col className="logo" xs={24} md={10} lg={4} xl={3}>
            <Image
              className="mt-2 mb-6 md-mb-10 lg-mb-2"
              src={`/logo.png`}
              preview={false}
            />
          </Col>
          {/* modificar lg y xl de .student-logout cuando se active boton de preguntas frecuentes */}
          <Col className="student-logout" xs={24} lg={21}>
            <Link
              className="tg-link-text ml-1"
              to={`/${paths.login.index}/${paths.login.student}`}
            >
              Iniciar sesión
            </Link>
          </Col>
          <Col className="frequent-questions-btn" xs={24} lg={21}>
            <Button>Preguntas Frecuentes</Button>
          </Col>
        </Row>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Row>
        <Col
          className="py-5"
          xs={{ span: 8, offset: 1 }}
          md={{ span: 4, offset: 1 }}
          lg={{ span: 2, offset: 1 }}
        >
          <Image src={`/logo-footer.jpg`} preview={false} />
        </Col>
      </Row>
    </Layout>
  );
};

export default SimpleHeaderLayout;
