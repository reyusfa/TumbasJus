import { combineReducers } from 'redux';
import { auth } from './reducers/auth';
import { products } from './reducers/products';
import { orders } from './reducers/orders';

export default combineReducers({
  auth,
  products,
  orders
});
