const ADD_TO_CART = "cart/ADD_TO_CART";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";
const UPDATE_CART_ITEM_COUNT = "cart/UPDATE_CART";
const EMPTY_CART = "cart/EMPTY_CART";

export const addToCart = (produceId) => {
  return {
    type: ADD_TO_CART,
    produceId,
  };
};

export const removeFromCart = (produceId) => {
  return {
    type: REMOVE_FROM_CART,
    produceId,
  };
};

export const updateCartItemCount = (produceId, newCount) => {
  return {
    type: UPDATE_CART_ITEM_COUNT,
    produceId,
    newCount,
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

export function selectCartItemsWithProduceInfo(state) {
  const cartItems = state.cart.items;
  const produce = state.produce;

  return cartItems.map((item) => ({
    ...item,
    ...produce[item.id],
  }));
}

export default function cartReducer(state = { items: [] }, action) {
  switch (action.type) {
    case ADD_TO_CART:
      if (!state.items.find((item) => item.id === action.produceId)) {
        return {
          ...state,
          items: [...state.items, { id: action.produceId, count: 1 }],
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.produceId
            ? { ...item, count: item.count + 1 }
            : item
        ),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.produceId),
      };
    case UPDATE_CART_ITEM_COUNT:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.produceId
            ? { ...item, count: action.newCount }
            : item
        ),
      };
    case EMPTY_CART:
      return { items: [] };
    default:
      return state;
  }
}

// export function selectCartItemsWithProduceInfo(state) {
//     const cart = state.cart;
//     const produce = state.produce;

//     return Object.values(cart).map((item) => ({
//       ...item,
//       ...produce[item.id],
//     }));
//   }

// export default function cartReducer(state = {}, action) {
//   switch (action.type) {
//     case ADD_TO_CART:
//       const updatedCartItem = {
//         id: action.produceId,
//         count: 1,
//       };
//       return { ...state, [action.produceId]: updatedCartItem };
//     case REMOVE_FROM_CART:
//       const updatedState = { ...state };
//       delete updatedState[action.produceId];
//       return updatedState;
//     case UPDATE_CART_ITEM_COUNT:
//       return {
//         ...state,
//         [action.produceId]: {
//           ...state[action.produceId],
//           count: action.newCount,
//         },
//       };
//     case EMPTY_CART:
//       return {}; // Reset the cart to an empty object
//     default:
//       return state;
//   }
// }
