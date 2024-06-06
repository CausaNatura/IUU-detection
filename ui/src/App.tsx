import './assets/fonts.css';
import 'styles/margin-classes.scss';
import 'styles/padding-classes.scss';
import 'boxicons/css/boxicons.min.css'; // CSS de Boxicons

import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from 'router/AppRouter';

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
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
