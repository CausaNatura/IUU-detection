import { Image } from 'antd';
import '../../styles/zone.scss';

const Zone = () => {
  return (
    <div className="zone-container">
      <h2>Tu zona de visualización es</h2>
      <div className='zone'>
        <h3>Parque Nacional Bahía de Loreto</h3>
        <p>Golfo de California | Estado de Baja California Sur</p>
        <Image
            src='/assets/'
            preview={false}
        />
      </div>
    </div>
  );
};
export default Zone;
