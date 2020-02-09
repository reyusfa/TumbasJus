import { combineReducers } from 'redux';
import { auth } from '../../Auth/reducer';
import { products } from '../../Home/reducer';
import { orders } from '../../Home/Order/reducer';

export default combineReducers({
  auth,
  products,
  orders
});
