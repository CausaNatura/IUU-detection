import { useCallback } from 'react';
import GetFrontendConfig from './getFrontConfig';

export const GetThemeFolder = (folderName: string) => {
  const frontendConfig = GetFrontendConfig();

  const getFolder = useCallback(() => {
    if (frontendConfig) {
      const theme = frontendConfig.global.theme;
      const folder = `${folderName}/${theme}`;
      return folder;
    }
  }, [folderName, frontendConfig]);

  const folder = getFolder();
  return folder;
};
