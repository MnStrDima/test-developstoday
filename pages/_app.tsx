import '../styles/global.css';

import { AppProps } from 'next/app';
import { Provider, useStore } from 'react-redux'
import { wrapper } from "../libs/store";
import { PersistGate } from "redux-persist/integration/react";

function App({ Component, pageProps }: AppProps) {
  const store = useStore();
  return (
    <Provider store={store}>
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Component {...pageProps} />
      </PersistGate>
      </Provider>
  );
}

export default wrapper.withRedux(App);