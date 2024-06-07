import { Col, Row } from 'antd';
import 'styles/global.scss';
import { PageTitle } from 'components/common/PageTitle';
import Scale from 'components/common/Scale';
import Zone from 'components/common/Zone';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <PageTitle>Predictor de Riesgos | </PageTitle>
      <Row>
        <Col xs={16}>.</Col>
        <Col className="g-left-container" xs={8}>
          <Scale />
          <Zone />
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
