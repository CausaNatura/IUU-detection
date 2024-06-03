import { Image, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { GetSiderItems } from 'hooks/GetSiderItems';
import { GetThemeFolder } from 'hooks/getThemeFolder';
import { SiderComponentProps } from 'interfaces/sider';
import { useState } from 'react';

export const SiderComponent = ({ collapsed }: SiderComponentProps) => {
  const assetsFolder = GetThemeFolder('assets');
  const { siderItems } = GetSiderItems();

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div id="sider-component">
      <Sider className="sider-container" collapsed={collapsed} width={'250px'}>
        <div className={collapsed ? 'sider-collapsed' : 'sider-uncollapsed'}>
          <div className="logo-container">
            {collapsed ? (
              <Image
                src={`/${assetsFolder}/logo-responsive.png`}
                preview={false}
              />
            ) : (
              <Image src={`/${assetsFolder}/logo-sider.png`} preview={false} />
            )}
          </div>
          <Menu
            className="main-menu"
            items={siderItems}
            mode="inline"
            data-cy="sider-menu"
            onOpenChange={onOpenChange}
            openKeys={openKeys}
          />
        </div>
      </Sider>
    </div>
  );
};
