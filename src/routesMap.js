import { redirect } from 'redux-first-router';

export default {
  HOME: { path: '/' },
  PRODUCTS: {
    path: '/products',
    thunk: async (dispatch, getState) => {

    }
  }
};
