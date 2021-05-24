import '../styles/global.css';

import App from 'next/app';
import { Provider, useStore } from 'react-redux';
import { wrapper } from '../libs/store';
import { PersistGate } from 'redux-persist/integration/react';

function myApp({ Component, pageProps }) {
  const store = useStore();
  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(myApp);
