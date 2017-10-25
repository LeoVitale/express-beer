import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { connectRoutes } from 'redux-first-router';

import routesMap from './routesMap';
import * as reducers from './reducers';

export default (history, preloadedState, client) => {
  const {
    reducer, middleware, enhancer, thunk
  } = connectRoutes(
    history,
    routesMap
  );
  let rootReducer;
  let middlewares;

  if (client) {
    rootReducer = combineReducers({
      ...reducers,
      apollo: client.reducer(),
      location: reducer
    });
    middlewares = applyMiddleware(middleware, client.middleware());
  } else {
    rootReducer = combineReducers({ ...reducers, location: reducer });
    middlewares = applyMiddleware(middleware);
  }

  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, preloadedState, enhancers);

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./reducers/index', () => {
      const reducers = require('./reducers/index');
      let rootReducer;
      if (client) {
        rootReducer = combineReducers({
          ...reducers,
          apollo: client.reducer(),
          location: reducer
        });
      } else {
        rootReducer = combineReducers({ ...reducers, location: reducer });
      }
      store.replaceReducer(rootReducer);
    });
  }

  return { store, thunk };
};

const composeEnhancers = (...args) =>
  typeof window !== 'undefined'
    ? composeWithDevTools({})(...args)
    : compose(...args);
