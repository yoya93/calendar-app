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

export const eventClearActiveEvents = () => {
  return {
    type: types.eventClearActiveEvents,
  };
};
export const eventUpdated = (event) => {
  return {
    type: types.eventUpdated,
    payload: event,
  };
};

export const eventDeleted = () => {
  return {
    type: types.eventDeleted,
  };
};
