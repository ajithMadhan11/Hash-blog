import { CONSTANTS } from "./index";

export const authUser = (user) => {
  return {
    type: CONSTANTS.AUTH_USER,
    payload: user,
  };
};
export const hashdata = (data) => {
  return {
    type: CONSTANTS.HASH_DATA,
    payload: data,
  };
};
