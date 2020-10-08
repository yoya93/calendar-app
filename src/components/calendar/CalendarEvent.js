import React from "react";

export const CalendarEvent = ({ event }) => {
  const { user, title } = event;
  console.log(event);

  return (
    <div>
      <span>{title}</span>
      <strong>- {user.name}</strong>
    </div>
  );
};
