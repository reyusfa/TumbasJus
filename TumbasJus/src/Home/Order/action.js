const actionAddItemToCart = data => {
  return {
    type: 'ADD_ITEM_TO_CART',
    payload: data
  };
};

const actionRemoveItemFromCart = data => {
  return {
    type: 'REMOVE_ITEM_FROM_CART',
    payload: data
  };
};

const actionAddQuantityItem = data => {
  return {
    type: 'ADD_QUANTITY_ITEM',
    payload: data
  };
};

const actionReduceQuantityItem = data => {
  return {
    type: 'REDUCE_QUANTITY_ITEM',
    payload: data
  };
};

export {
  actionAddItemToCart,
  actionRemoveItemFromCart,
  actionAddQuantityItem,
  actionReduceQuantityItem
};
