import axios from 'axios';
import qs from 'qs';

import { API_HOST } from 'react-native-dotenv';

const getProducts = ({ headers, params }) => {
  const config = {
    headers,
    params,
    paramsSerializer: params => {
      return qs.stringify(params);
    }
  };
  return {
    type: 'GET_PRODUCTS',
    payload: axios.get(`${API_HOST}/products`, config).then(({ data }) => {
      return data;
    })
  };
};

export { getProducts };
