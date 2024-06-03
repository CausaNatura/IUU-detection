import { Button, Col, Layout, Row, Image } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { SiderComponent } from 'components/common/Sider';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { HelpFloatButton } from 'components/common/HelpFloatButton';
import { GetThemeFolder } from 'hooks/getThemeFolder';
import 'styles/admin-layout.scss';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const assetsFolder = GetThemeFolder('assets');

  return (
    <Layout className="tg-simple-layout-container">
      <Row>
        <Col xl={24}>
          <SiderComponent collapsed={collapsed} />
        </Col>
      </Row>
      <Layout>
        <Header className="collapse-btn-header">
          <Button
            className="collapse-btn"
            type="text"
            icon={
              <VerticalAlignTopOutlined
                className={`icon ${collapsed ? 'open-icon-position' : 'close-icon-position'}`}
              />
            }
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Row>
          <Col className="py-5 g-logo-footer" xs={{ span: 11, offset: 1 }}>
            <Image src={`/${assetsFolder}/logo-footer.jpg`} preview={false} />
          </Col>
        </Row>
        <HelpFloatButton />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
