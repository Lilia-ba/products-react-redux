const initialState = [];

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
          return [...state, action.payload];
        case 'FETCH_PRODUCTS':
          return action.payload;
        case 'DELETE_PRODUCT':
          return state.filter((product) => product._id !== action.payload);
          case 'UPDATE_PRODUCT':
            const products = state.map((product) => {
               return product._id === action.payload._id?  action.payload  : product 
            }
            )
            console.log(products)
            return [...products]
        default:
          return state;
      }
    };
    
    export default productReducer;

