import { Image } from 'antd';
import '../../styles/zone.scss';
import Lock from '/assets/icon/icon-lock.svg';

const Zone = () => {
  return (
    <div className="zone-container">
      <h2>Tu zona de visualización es</h2>
      <div className='zone'>
        <h3>Parque Nacional Bahía de Loreto</h3>
        <p>Golfo de California | Estado de Baja California Sur</p>
        <div className='lock'>
            <Image
                src={Lock}
                preview={false}
            />
        </div>
      </div>
      <h2>con preddicciones estimadas el <br/><span> 14 de mayo de 2024 </span> para el</h2>
    </div>
  );
};
export default Zone;
