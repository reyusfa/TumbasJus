import axios from 'axios';
import qs from 'qs';

import { API_HOST } from 'react-native-dotenv';

const actionGetProducts = ({ headers, params }) => {
  const config = {
    headers,
    params,
    paramsSerializer: _params => {
      return qs.stringify(_params);
    }
  };
  return {
    type: 'GET_PRODUCTS',
    payload: axios.get(`${API_HOST}/products`, config).then(({ data }) => {
      return data;
    })
  };
};

const actionGetMoreProducts = ({ headers, params }) => {
  const config = {
    headers,
    params,
    paramsSerializer: _params => {
      return qs.stringify(_params);
    }
  };
  return {
    type: 'GET_MORE_PRODUCTS',
    payload: axios.get(`${API_HOST}/products`, config).then(({ data }) => {
      return data;
    })
  };
};

export { actionGetProducts, actionGetMoreProducts };
