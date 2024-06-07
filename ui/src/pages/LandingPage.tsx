import { Col, Row } from 'antd';
import 'styles/global.scss';
import { PageTitle } from 'components/common/PageTitle';
import Map from 'components/common/Map';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <PageTitle>Predictor de Riesgos | Data Center</PageTitle>
      <Row>
        <Col xs={16}>
          <Map />
        </Col>
        <Col xs={8}>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
