import axios from 'axios';
import qs from 'qs';

import { API_HOST } from 'react-native-dotenv';

const actionGetCategories = ({ headers }) => {
  const config = {
    headers
  };
  return {
    type: 'GET_CATEGORIES',
    payload: axios.get(`${API_HOST}/categories`, config).then(({ data }) => {
      return data;
    })
  };
};

export { actionGetCategories };
