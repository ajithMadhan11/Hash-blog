import { CONSTANTS } from "../action";

const initialState = {
  authenticated: false,
  uid: "",
  error: "",
  isLoaded: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.AUTH_USER:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
