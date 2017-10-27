const UPDATE_POC_ID = 'expressbeer/products/UPDATE_POC_ID';
const UPDATE_TOTAL_PRICE = 'expressbeer/products/UPDATE_TOTAL_PRICE';

const initialState = {
  pocId: '192',
  price: 0
};

export default function reducer(
  state = { ...initialState, ...state },
  action = {}
) {
  switch (action.type) {
    case UPDATE_POC_ID:
      return {
        ...state,
        pocId: action.payload
      };
    case UPDATE_TOTAL_PRICE:
      return {
        ...state,
        price: action.payload
      };
    default:
      return state;
  }
}

export function updatePocId(id) {
  return {
    type: UPDATE_POC_ID,
    payload: id
  };
}

export function updateTotalPrice(price) {
  return {
    type: UPDATE_TOTAL_PRICE,
    payload: price
  };
}
