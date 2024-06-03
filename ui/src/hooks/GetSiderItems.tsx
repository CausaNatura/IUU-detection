import { useCallback, useEffect, useState } from 'react';
import GetFrontendConfig from './getFrontConfig';
import { MenuProps } from 'antd';
import { FixedSiderItems, SiderItemsRelation } from 'constants/SiderItems';

export const GetSiderItems = () => {
  const frontendConfig = GetFrontendConfig();
  const [siderItemsList, setSiderItemsList] = useState<string[]>();
  const [siderItems, setSiderItems] = useState<MenuProps['items']>();

  const getSiderItemsList = useCallback(() => {
    if (frontendConfig && frontendConfig.sider) {
      const parsedItems = JSON.parse(frontendConfig.sider.items);
      setSiderItemsList(parsedItems);
    }
  }, [frontendConfig]);

  const constructSiderItems = useCallback(() => {
    const items: MenuProps['items'] = [];
    if (siderItemsList) {
      siderItemsList.forEach((item: string) => {
        const siderItem = SiderItemsRelation[item];
        if (siderItem) {
          items.push(SiderItemsRelation[item]);
        }
      });
    }
    const finalItems: MenuProps['items'] = [...items, ...FixedSiderItems!];
    setSiderItems(finalItems);
  }, [siderItemsList]);

  useEffect(() => {
    constructSiderItems();
  }, [constructSiderItems]);

  useEffect(() => {
    getSiderItemsList();
  }, [getSiderItemsList]);

  return {
    siderItems,
  };
};
