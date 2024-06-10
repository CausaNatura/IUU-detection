import { Button } from 'antd';
import '../../styles/map.scss';

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
    </div>
  );
};
export default Map;
