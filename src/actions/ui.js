import { types } from "../types/types";

export const ui0penModal = () => {
  return {
    type: types.uiOpenModal,
  };
};

export const uiCloseModal = () => {
  return {
    type: types.uiCloseModal,
  };
};
