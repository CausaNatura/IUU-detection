import { Card, Col, Row, Image } from 'antd';
import 'styles/global.scss';
import { ArrowRightOutlined } from '@ant-design/icons';
import { RedirectToRightLogin } from 'components/common/RedirectToRightLogin';
import 'styles/landing-page.scss';
import { Link } from 'react-router-dom';
import { paths } from 'constants/paths';
import { PageTitle } from 'components/common/PageTitle';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <PageTitle>Predictor de Riesgos | </PageTitle>
      <Row justify="center" align="middle">
        <Col xs={24} className="g-logo-container">
          <Image src={`/logo.png`} preview={false} />
        </Col>
      </Row>
      <Row justify="center" className="mt-20">
        <Col xs={24}>
          <h2 className="title g-text-bold">
            ¡Bienvenido al programa
            <span className="name">nombre</span>!
          </h2>
        </Col>
      </Row>
      <Row justify="center" className="mb-20">
        <Col xs={22} lg={8}>
          <p className="description">
            En este programa realizarás una evaluación diagnóstica con el
            objetivo de obtener un panorama inicial del estatus en el que te
            encuentras.
          </p>
        </Col>
      </Row>
      <Row justify="center" gutter={[{ xs: 16, lg: 28 }, 16]} className="mb-20">
        <Col xs={24} lg={8} xl={6}></Col>
        <Col xs={24} lg={8} xl={6}></Col>
        <Col xs={24} lg={8} xl={6}>
          <Link to={`/${paths.login.index}/${paths.login.student}`}>
            <Card className="card start-card">
              <div className="g-flex">
                <span className="start-txt">Comenzar ahora</span>
                <ArrowRightOutlined className="start-icon" />
              </div>
            </Card>
          </Link>
        </Col>
      </Row>
      <RedirectToRightLogin userType="admin" />
    </div>
  );
};

export default LandingPage;
