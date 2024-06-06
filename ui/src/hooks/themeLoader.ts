import defaultTheme from 'themes/default';

export const themeLoader = (theme: string) => {
  switch (theme) {
    case 'default':
      return defaultTheme;
  }
};
