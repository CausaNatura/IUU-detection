import { Helmet, HelmetProvider } from 'react-helmet-async';
import { WithChildrenProps } from 'types';

const helmetContext = {};

export const PageTitle = ({ children }: WithChildrenProps) => {
  return (
    <HelmetProvider context={helmetContext}>
      <Helmet>
        <title>{children}</title>
      </Helmet>
    </HelmetProvider>
  );
};
