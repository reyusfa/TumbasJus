import axios from 'axios';

import { API_HOST } from 'react-native-dotenv';

const actionGetUser = ({ headers, id }) => {
  const config = {
    headers
  };
  return {
    type: 'GET_USER',
    payload: axios.get(`${API_HOST}/users/${id}`, config).then(({ data }) => {
      return data;
    })
  };
};

const actionPutUser = ({ headers, body, id }) => {
  const config = {
    headers
  };
  return {
    type: 'PUT_USER',
    payload: axios
      .put(`${API_HOST}/users/${id}`, body, config)
      .then(({ data }) => {
        return data;
      })
  };
};

export { actionGetUser, actionPutUser };
