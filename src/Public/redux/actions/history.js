import axios from 'axios';
import qs from 'qs';

import { API_HOST } from 'react-native-dotenv';

const actionGetOrderHistory = ({ headers, params }) => {
  const config = {
    headers,
    params,
    paramsSerializer: _params => {
      return qs.stringify(_params);
    }
  };
  return {
    type: 'GET_ORDER_HISTORY',
    payload: axios.get(`${API_HOST}/orders`, config).then(({ data }) => {
      return data;
    })
  };
};

export { actionGetOrderHistory };
