import { types } from "../types/types";

const initialState = {
  cheking: true,
  // uid: null,
  // name: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        cheking: false,
        uid: action.payload.uid,
        name: action.payload.name,
      };
    default:
      return state;
  }
};
