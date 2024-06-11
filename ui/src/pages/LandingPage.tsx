import { Col, Row } from 'antd';
import 'styles/global.scss';
import { PageTitle } from 'components/common/PageTitle';
import Map from 'components/common/Map';
import Scale from 'components/common/Scale';
import Zone from 'components/common/Zone';
import FeatureMessage from 'components/common/FeatureMessage';
import MessageProblem from 'components/common/MessageProblem';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <PageTitle>Predictor de Riesgos | Data Center</PageTitle>
      <Row>
        <Col xs={16}>
          <Map />
        </Col>
        <Col className="g-left-container" xs={8}>
          <Scale />
          <Zone />
          <FeatureMessage />
          <MessageProblem />
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
