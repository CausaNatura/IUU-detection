import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <Layout className="tg-main-layout-container">
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
