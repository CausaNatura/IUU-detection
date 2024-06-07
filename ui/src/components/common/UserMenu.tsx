import { UserOutlined } from '@ant-design/icons';
import { Dropdown, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import Link from 'antd/es/typography/Link';

const items: MenuProps['items'] = [
  {
    key: 'password',
    label: 'Restablecer contraseña',
  },
  {
    key: 'logout',
    label: 'Cerrar sesión',
  },
];
const UserMenu = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Dropdown: {
            colorBgElevated: '#0FB6CC',
            controlPaddingHorizontal: 30,
            boxShadowSecondary: '0',
            colorText: 'white',
            fontSize: 14,
            motionDurationMid: '0.01s',
          },
        },
      }}
    >
      <Dropdown menu={{ items }}>
        <Link onClick={(e) => e.preventDefault()} className="user-link">
          <span className="username">Mónica Navarro</span>
          <UserOutlined className="icon" />
        </Link>
      </Dropdown>
    </ConfigProvider>
  );
};
export default UserMenu;
