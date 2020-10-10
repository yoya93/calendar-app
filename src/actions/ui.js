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

export const EventSetActive = (event) => {
  return {
    type: types.eventSetActive,
    payload: event,
  };
};
export const EventAddNew = (event) => {
  return {
    type: types.eventAddNew,
    payload: event,
  };
};
