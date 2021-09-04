import { CONSTANTS } from "../action";

const initialState = {
  data: "",
  user: "",
  error: "",
  isLoaded: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.HASH_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default dataReducer;
