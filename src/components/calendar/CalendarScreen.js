import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Swal from "sweetalert2";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";

import { CalendarEvent } from "./CalendarEvent";
import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendar-message-es";

import { CalendarModal } from "./CalendarModal";
import {
  ui0penModal,
  EventSetActive,
  eventClearActiveEvents,
  EventStartLoaded,
} from "../../actions/ui";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es");
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { activeEvent, events } = useSelector((state) => state.calendar);

  useEffect(() => {
    dispatch(EventStartLoaded());
  }, [dispatch]);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    dispatch(ui0penModal());
  };
  const onSelectEvent = (e) => {
    dispatch(EventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    if (e.action === "click") {
      dispatch(eventClearActiveEvents());
    } else {
      const now = moment().minutes(0).seconds(0).add("days", -1);

      const momentIni = moment(e.slots[0]);
      console.log(e);

      if (now.isAfter(momentIni)) {
        return Swal.fire(
          "Error",
          "Los eventos se deben crear a partir de la fecha actual",
          "error"
        );
      }

      dispatch(ui0penModal());
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onDoubleClickEvent={onDoubleClick}
        view={lastView}
        onSelectSlot={onSelectSlot}
        selectable={true}
      />
      <AddNewFab />
      {activeEvent && <DeleteEventFab />}

      <CalendarModal />
    </div>
  );
};
