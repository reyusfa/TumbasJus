const initialState = {
  data: [],
  isLoading: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
};

export { auth };
