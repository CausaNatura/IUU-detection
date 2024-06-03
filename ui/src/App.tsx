import './assets/fonts.css';
import 'styles/margin-classes.scss';
import 'styles/padding-classes.scss';
import 'boxicons/css/boxicons.min.css'; // CSS de Boxicons

import { Provider } from 'react-redux';
import { store } from './store/store';
import { ConfigProvider } from 'antd';
import { AppRouter } from 'router/AppRouter';
import { GetAppTheme } from 'hooks/getAppTheme';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from 'config/authConfig';

function App() {
  const appTheme = GetAppTheme();
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <>
      {appTheme && (
        <div className="App">
          <MsalProvider instance={msalInstance}>
            <GoogleOAuthProvider clientId="25798192880-pstek8m0kh4ttn06vub1qj1s9m4flflg.apps.googleusercontent.com">
              <ConfigProvider theme={appTheme}>
                <AppRouter />
              </ConfigProvider>
            </GoogleOAuthProvider>
          </MsalProvider>
        </div>
      )}
    </>
  );
}

function MyApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default MyApp;
