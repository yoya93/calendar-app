import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";

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

export const EventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const resp = await fetchConToken("events", event, "POST");
      const body = await resp.json();

      console.log(body);

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name: name,
        };

        dispatch(EventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const EventAddNew = (event) => {
  return {
    type: types.eventAddNew,
    payload: event,
  };
};
