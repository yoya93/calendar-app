import React from "react";
import { eventStartDeleted } from "../../actions/ui";
import { useDispatch } from "react-redux";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(eventStartDeleted());
      }}
      className="btn btn-danger fab-danger"
    >
      <i className="fas fa-trash"></i>
      <span>Borrar evento</span>
    </button>
  );
};
