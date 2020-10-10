import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { messages } from "../../helpers/calendar-message-es";
import { CalendarEvent } from "./CalendarEvent";
import { Navbar } from "../ui/Navbar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { CalendarModal } from "./CalendarModal";
import { ui0penModal, EventSetActive } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import { AddNewFab } from "../ui/AddNewFab";

moment.locale("es");
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.calendar);

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
      />
      <AddNewFab />

      <CalendarModal />
    </div>
  );
};
