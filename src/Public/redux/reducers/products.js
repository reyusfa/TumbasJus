const initialState = {
  data: [],
  pagination: {},
  isLoading: false
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_PRODUCTS_FULFILLED':
      return {
        isLoading: false,
        data: action.payload.data,
        pagination: action.payload.pagination
      };
    case 'GET_PRODUCTS_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'GET_MORE_PRODUCTS_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_MORE_PRODUCTS_FULFILLED':
      return {
        isLoading: false,
        data: [...state.data, ...action.payload.data],
        pagination: action.payload.pagination
      };
    case 'GET_MORE_PRODUCTS_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export { products };
