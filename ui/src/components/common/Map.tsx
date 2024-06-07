import { Button } from 'antd';
import '../../styles/map.scss';

function ButtonView() {
  return (
    <Button href="#">
      
      <span>Alertas</span>
    </Button>
  );
}

const Map = () => {
  return (
    <div className="map-container">
      <ButtonView />
    </div>
  );
};
export default Map;
