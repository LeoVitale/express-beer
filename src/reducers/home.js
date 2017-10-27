const SET_QUERIES_VALUE = 'expressbeer/home/SET_QUERIES_VALUES';

const initialState = {
  skipQuerie: true
};

export default function reducer(
  state = { ...initialState, ...state },
  action = {}
) {
  switch (action.type) {
    case SET_QUERIES_VALUE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export function setQuerieValue(querie) {
  return {
    type: SET_QUERIES_VALUE,
    payload: querie
  };
}
