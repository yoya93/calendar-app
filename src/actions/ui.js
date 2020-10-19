import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import Swal from "sweetalert2";

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

export const EventStartLoaded = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("events");
      const body = await resp.json();

      const event = prepareEvents(body.events);

      dispatch(EventLoaded(event));
    } catch (error) {
      console.log(error);
    }
  };
};

const EventLoaded = (event) => {
  return {
    type: types.eventLoaded,
    payload: event,
  };
};

export const eventStartUpdated = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`events/${event.id}`, event, "PUT");
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventUpdated = (event) => {
  return {
    type: types.eventUpdated,
    payload: event,
  };
};
