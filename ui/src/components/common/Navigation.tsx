import { useState } from 'react';
import '../../styles/nav.scss';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Predictor de Probabilidades',
    key: 'predictor',
  },
  {
    label: 'Zonas de mayor influencia',
    key: 'influencia',
    disabled: true,
  },
  {
    label: 'Análisis de rutas',
    key: 'rutas',
    disabled: true,
  },
];

const NavMenu = () => {
  const [current, setCurrent] = useState('mail');
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };
  return (
    <div className="nav">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};
export default NavMenu;
