const UPDATE_POC_ID = 'expressbeer/products/UPDATE_POC_ID';

const initialState = {
  pocId: '0'
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
