import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import HeaderContent from 'components/common/Header';
import NavMenu from 'components/common/Navigation';

const MainLayout = () => {
  return (
    <Layout className="g-main-layout">
      <Header>
        <HeaderContent />
        <NavMenu/>
      </Header>
      <Content className="g-main-layout-container">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
