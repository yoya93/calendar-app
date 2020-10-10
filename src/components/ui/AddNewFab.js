import React from "react";
import { ui0penModal } from "../../actions/ui";
import { useDispatch } from "react-redux";

export const AddNewFab = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(ui0penModal());
      }}
      className="btn btn-primary fab"
    >
      <i className="fas fa-plus"></i>
    </button>
  );
};
