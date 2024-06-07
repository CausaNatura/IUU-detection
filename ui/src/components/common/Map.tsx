import { Button } from 'antd';
import '../../styles/map.scss';
import InfoButton from './InfoButton';

type ButtonProps = {
  text: string;
  btnClass: string;
  btnDefault?: 'disabled' | '';
};

function ButtonView({ text, btnClass, btnDefault = '' }: ButtonProps) {
  return (
    <Button className={`${btnDefault}` + ' btn-action'} href="#">
      <div className={`${btnClass}` + ' btn-icon'} />
      <span className={btnClass}>{text}</span>
    </Button>
  );
}

const Map = () => {
  return (
    <div className="map-container">
      <ButtonView text="Alertas" btnClass="alerta" btnDefault="disabled" />
      <ButtonView text="Bitácora" btnClass="bitacora" btnDefault="" />
      <InfoButton />
    </div>
  );
};
export default Map;
