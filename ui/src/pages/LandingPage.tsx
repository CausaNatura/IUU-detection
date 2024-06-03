import { Card, Col, Row, Image } from 'antd';
import 'styles/global.scss';
import { GetThemeFolder } from 'hooks/getThemeFolder';
import GetFrontendConfig from 'hooks/getFrontConfig';
import { ArrowRightOutlined } from '@ant-design/icons';
import { HelpCards } from 'components/common/HelpCards';
import { RedirectToRightLogin } from 'components/common/RedirectToRightLogin';
import 'styles/landing-page.scss';
import { Link } from 'react-router-dom';
import { paths } from 'constants/paths';
import { PageTitle } from 'components/common/PageTitle';

const LandingPage = () => {
  const assetsFolder = GetThemeFolder('assets');
  const frontendConfig = GetFrontendConfig();
  const { ContactInfo, FrequentQuestions } = HelpCards();

  return (
    <div className="landing-page">
      <PageTitle>{frontendConfig?.global.name}</PageTitle>
      <Row justify="center" align="middle">
        <Col xs={24} className="g-logo-container">
          <Image src={`/${assetsFolder}/logo.png`} preview={false} />
        </Col>
      </Row>
      <Row justify="center" className="mt-20">
        <Col xs={24}>
          <h2 className="title g-text-bold">
            ¡Bienvenido al programa
            <span className="name"> {frontendConfig?.global.name}</span>!
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
        <Col xs={24} lg={8} xl={6}>
          <FrequentQuestions />
        </Col>
        <Col xs={24} lg={8} xl={6}>
          <ContactInfo />
        </Col>
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
