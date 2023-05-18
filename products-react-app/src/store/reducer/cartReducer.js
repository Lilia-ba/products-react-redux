
const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity
        const updatedItems = [...state];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return updatedItems;
      } else {
        // If the item doesn't exist in the cart, add it as a new item
        return [...state, action.payload];
      }

    case 'REMOVE_FROM_CART':
      const updatedItems = state.filter(
        (item) => item.productId !== action.payload.productId
      );
      return updatedItems;

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

export default cartReducer;