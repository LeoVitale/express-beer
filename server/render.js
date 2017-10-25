import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
// apollo imports
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from 'react-apollo';

import configureStore from './configureStore';
import App from '../src/components/App';

const networkInterface = createNetworkInterface({
  uri:
    'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql'
});

const client = new ApolloClient({
  networkInterface
});

export default ({ clientStats }) => async (req, res, next) => {
  const store = await configureStore(req, res);
  if (!store) return; // no store means redirect was already served

  const app = createApp(App, store);
  const appString = ReactDOM.renderToString(app);
  const stateJson = JSON.stringify(store.getState());
  const chunkNames = flushChunkNames();
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  console.log('REQUESTED PATH:', req.path);
  console.log('CHUNK NAMES RENDERED', chunkNames);

  return res.send(`<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>redux-first-router-boilerplate</title>
          ${styles}
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div id="root">${appString}</div>
          ${cssHash}
          <script type='text/javascript' src='/static/vendor.js'></script>
          ${js}
        </body>
      </html>`);
};

const createApp = (App, store) => (
  <ApolloProvider client={client} store={store}>
    <App />
  </ApolloProvider>
);
