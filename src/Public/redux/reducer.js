import { combineReducers } from 'redux';
import { auth } from './reducers/auth';
import { products } from './reducers/products';
import { categories } from './reducers/categories';
import { orders } from './reducers/orders';
import { user } from './reducers/user';
import { history } from './reducers/history';

export default combineReducers({
  auth,
  products,
  orders,
  user,
  history,
  categories
});
