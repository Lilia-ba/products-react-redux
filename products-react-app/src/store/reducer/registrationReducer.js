const initialState = {
    registrationData: null,
    userData: null
  
  };
  
  const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
      case "REGISTER_SUCCESS":
        return {
          ...state,
          registrationData: action.payload,
        };
      case "SET_USER_DATA": {
        state.userData = action.payload
        return {...state}
      }
      default:
        return state;
    }
  };
  
  export default registrationReducer;
    