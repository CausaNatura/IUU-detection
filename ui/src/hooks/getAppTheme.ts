import { ThemeConfig } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import GetFrontendConfig from './getFrontConfig';
import { themeLoader } from './themeLoader';

export const GetAppTheme = () => {
  const frontendConfig = GetFrontendConfig();
  const [appTheme, setAppTheme] = useState<ThemeConfig>();

  const setTheme = useCallback(() => {
    if (frontendConfig) {
      setAppTheme(themeLoader(frontendConfig.global.theme));
      document.body.classList.add(`theme-${frontendConfig.global.theme}`);
    }
  }, [frontendConfig]);

  useEffect(() => {
    setTheme();
  }, [setTheme]);

  return appTheme;
};

export const GetThemeName = () => {
  const frontendConfig = GetFrontendConfig();
  const [themeName, setThemeName] = useState<string>();

  const getThemeName = useCallback(() => {
    if (frontendConfig) {
      setThemeName(frontendConfig.global.theme);
    }
  }, [frontendConfig]);

  useEffect(() => {
    getThemeName();
  }, [getThemeName]);

  return themeName;
};
