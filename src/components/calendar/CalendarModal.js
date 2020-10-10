import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import {
  uiCloseModal,
  EventAddNew,
  eventClearActiveEvents,
  eventUpdated,
} from "../../actions/ui";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlus1.toDate(),
};

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent, events } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [formValues, setformValues] = useState(initEvent);
  const [titleValid, setTitleValid] = useState(true);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setformValues(activeEvent);
    } else {
      setformValues(initEvent);
    }
  }, [activeEvent, setformValues]);

  const handleChangeForm = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvents());
    setformValues(initEvent);
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setformValues({
      ...formValues,
      start: e,
    });
  };
  const handledateEndChange = (e) => {
    setDateEnd(e);
    setformValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "La fecha fin debe de ser mayor a la fecha de inicio",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if (activeEvent) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(
        EventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            id: "123456",
            name: "Yoya",
          },
        })
      );
    }

    setTitleValid(true);

    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> {activeEvent ? "Editar evento" : "Nuevo evento"}</h1>
      <hr />
      <form onSubmit={handleSubmitForm} noValidate className="container">
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handledateEndChange}
            value={dateEnd}
            className="form-control"
            minDate={dateStart}
          />
        </div>
        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleChangeForm}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleChangeForm}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>
        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
