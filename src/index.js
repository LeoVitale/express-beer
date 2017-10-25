/* eslint-disable global-require */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import WebFont from 'webfontloader';
// apollo imports
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from 'react-apollo';

import configureStore from './configureStore';
import App from 'containers/App';

WebFont.load({
  google: {
    families: ['Open Sans:300,400,600,700']
  }
});

const networkInterface = createNetworkInterface({
  uri:
    'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql'
});

const client = new ApolloClient({
  ssrMode: true,
  networkInterface
});

const history = createHistory();
const { store } = configureStore(history, window.REDUX_STATE, client);

const render = App => {
  const root = document.getElementById('root');

  ReactDOM.hydrate(
    <AppContainer>
      <ApolloProvider client={client} store={store}>
        <App />
      </ApolloProvider>
    </AppContainer>,
    root
  );
};

render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('containers/App', () => {
    const App = require('containers/App').default;
    render(App);
  });
}
