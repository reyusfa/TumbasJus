const initialState = {
  data: [],
  pagination: {},
  isLoading: false
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_CATEGORIES_FULFILLED':
      return {
        isLoading: false,
        data: action.payload.data,
        pagination: action.payload.pagination
      };
    case 'GET_CATEGORIES_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export { categories };
