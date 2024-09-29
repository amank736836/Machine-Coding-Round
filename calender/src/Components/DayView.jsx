import React from "react";
import DayTimeSlots from "./DayTimeSlots";
import Events from "./Events";
import events from "../data/events.json";
const DayView = () => {
  return (
    <div className="day-view">
      <div className="day-view-header"></div>
      <DayTimeSlots />
      <Events events={events} />
    </div>
  );
};

export default DayView;
