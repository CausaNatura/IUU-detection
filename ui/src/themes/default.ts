import { ThemeConfig } from 'antd';

export const themeColors = {
  primary: '#4674c2',
  secondary: '#fdbf2d',
  primaryAccent: '#275ab1',
  secondAccent: '#e95cc0',
  dark: '#484848',
  error: '#ff9999',
  success: '#00c365',
  warning: '#fff4d8',
  gradiente: 'rgba(39, 90, 177, 1)',
  modalBgMask: 'rgba(39, 90, 177, 0.8)', // Same as primaryAccent but transparent
  helpPopoverBg: '#EDEDED',
};

const defaultTheme: ThemeConfig = {
  token: {
    // Seed Token
    colorPrimary: themeColors.primary,
  },
  components: {
    Button: {
      algorithm: true,
      colorPrimary: themeColors.primary,
      borderRadius: 5,
    },
    Spin: {
      colorPrimary: 'white',
    },
    Modal: {
      colorBgMask: themeColors.modalBgMask,
    },
    Layout: {
      siderBg: themeColors.primary,
    },
  },
};

export default defaultTheme;
