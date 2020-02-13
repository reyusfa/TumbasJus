const initialState = {
  data: [],
  isLoading: false
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORDER_HISTORY_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_ORDER_HISTORY_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: action.payload.data
      };
    case 'GET_ORDER_HISTORY_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export { history };
