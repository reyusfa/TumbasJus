const initialState = {
  cart: [],
  order: [],
  totalOrder: 0
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART':
      const newCart = !state.cart.includes(action.payload.id)
        ? [...state.cart, action.payload.id]
        : state.cart;
      const newOrder = !state.cart.includes(action.payload.id)
        ? [
            ...state.order,
            {
              product_id: action.payload.id,
              name: action.payload.name,
              price: action.payload.price,
              quantity: 1,
              subtotal: action.payload.price
            }
          ]
        : [
            ...state.order.map(item => {
              if (item.product_id === action.payload.id) {
                return {
                  product_id: item.product_id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity + 1,
                  subtotal: item.price * (item.quantity + 1)
                };
              } else {
                return item;
              }
            })
          ];
      const newTotal = newOrder.reduce((a, b) => {
        return a + b.subtotal;
      }, 0);
      return {
        ...state,
        cart: [...newCart],
        order: [...newOrder],
        totalOrder: newTotal
      };
    case 'REMOVE_ITEM_FROM_CART':
      const newCartOnRemove = state.cart.filter(
        item => item !== action.payload.id
      );
      const newOrderOnRemove = state.order.filter(
        item => item.product_id !== action.payload.id
      );
      const newTotalOnRemove = newOrderOnRemove.reduce((a, b) => {
        return a + b.subtotal;
      }, 0);
      return {
        cart: [...newCartOnRemove],
        order: [...newOrderOnRemove],
        totalOrder: newTotalOnRemove
      };
    case 'ADD_QUANTITY_ITEM':
      const newCartOnAdd = !state.cart.includes(action.payload.id)
        ? [...state.cart, action.payload.id]
        : state.cart;
      const newOrderOnAdd = !state.cart.includes(action.payload.id)
        ? [
            ...state.order,
            {
              product_id: action.payload.id,
              name: action.payload.name,
              price: action.payload.price,
              quantity: 1,
              subtotal: action.payload.price
            }
          ]
        : [
            ...state.order.map(item => {
              if (item.product_id === action.payload.id) {
                return {
                  product_id: item.product_id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity + 1,
                  subtotal: item.price * (item.quantity + 1)
                };
              } else {
                return item;
              }
            })
          ];
      const newTotalOnAdd = newOrderOnAdd.reduce((a, b) => {
        return a + b.subtotal;
      }, 0);
      return {
        cart: [...newCartOnAdd],
        order: [...newOrderOnAdd],
        totalOrder: newTotalOnAdd
      };
    case 'REDUCE_QUANTITY_ITEM':
      let newCartOnReduce = [...state.cart];
      const newOrderOnReduce = state.order
        .map(item => {
          if (item.product_id === action.payload.id) {
            if (item.quantity > 1) {
              return {
                product_id: item.product_id,
                name: item.name,
                price: item.price,
                quantity: item.quantity - 1,
                subtotal: item.price * (item.quantity - 1)
              };
            } else {
              newCartOnReduce.splice(
                newCartOnReduce.indexOf(action.payload.id),
                1
              );
              return;
            }
          } else {
            return item;
          }
        })
        .filter(Boolean);
      const newTotalOnReduce = newOrderOnReduce.reduce((a, b) => {
        return a + b.subtotal;
      }, 0);
      return {
        cart: [...newCartOnReduce],
        order: [...newOrderOnReduce],
        totalOrder: newTotalOnReduce
      };
    default:
      return state;
  }
};

export { orders };
