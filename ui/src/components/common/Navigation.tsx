import { useState } from 'react';
import '../../styles/nav.scss';
import type { MenuProps } from 'antd';
import { Menu } from "antd";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
      label: 'Navigation One',
      key: 'mail',
    },
    {
      label: 'Navigation Two',
      key: 'app',
      disabled: true,
    },
    {
      key: 'alipay',
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      ),
    },
  ];

  
  const NavMenu = () => {
    const [current, setCurrent] = useState('mail');
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
      };
    return (
        <div className="nav">
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </div>
    )
};
export default NavMenu;
