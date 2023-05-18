import { createStore, combineReducers } from "redux";
import registrationReducer from "./reducer/registrationReducer";
import categoryReducer from "./reducer/categoryReducer";
import productReducer from "./reducer/productReducer";
import cartReducer from "./reducer/cartReducer";
const rootReducer = combineReducers({
    registrationReducer,
    categoryReducer,
    productReducer,
    cartReducer

});
export const store = createStore(rootReducer)