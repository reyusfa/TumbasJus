const initialState = {
  data: [],
  isLoading: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: action.payload.data
      };
    case 'GET_USER_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'PUT_USER_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'PUT_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: action.payload.data
      };
    case 'PUT_USER_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export { user };
