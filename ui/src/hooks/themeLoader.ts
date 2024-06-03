import defaultTheme from 'themes/default';
import rutasqro_2 from 'themes/rutasqro_2';
import recrea from 'themes/recrea';

export const themeLoader = (theme: string) => {
  switch (theme) {
    case 'default':
      return defaultTheme;
    case 'rutasqro':
      return defaultTheme;
    case 'rutasqro_2':
      return rutasqro_2;
    case 'recrea':
      return recrea;
  }
};
