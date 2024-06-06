import { Button, Col, Layout, Row, Image } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
// import { SiderComponent } from 'components/common/Sider';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import 'styles/admin-layout.scss';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="tg-simple-layout-container">
      <Row>
        <Col xl={24}>
          {/* <SiderComponent collapsed={collapsed} /> */}
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
            <Image src={`/logo-footer.jpg`} preview={false} />
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
