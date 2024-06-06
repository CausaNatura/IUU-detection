import { Image } from 'antd';
import '../../styles/header.scss';
import Logo from '/assets/logo-datacenter.svg';
import UserMenu from './UserMenu';

const HeaderContent = () => {
  return (
    <div className="header-container">
      <Image
        src={Logo}
        preview={false}
        alt="Logotipo Data Center"
        width={260}
      />
      <UserMenu />
    </div>
  );
};
export default HeaderContent;
