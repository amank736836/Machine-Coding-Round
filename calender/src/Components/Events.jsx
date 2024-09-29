import React from "react";

const Events = ({ events }) => {
  return (
    <>
      {events.map((event) => {
        const startHourString = event.start.split(":")[0];
        const startMinuteString = event.start.split(":")[1];
        const startHourNumber = parseInt(startHourString);
        const startMinuteNumber = parseInt(startMinuteString);

        const endHourString = event.end.split(":")[0];
        const endMinuteString = event.end.split(":")[1];
        const endHourNumber = parseInt(endHourString);
        const endMinuteNumber = parseInt(endMinuteString);

        const top = startHourNumber * 5 + (startMinuteNumber / 60) * 5;

        let height =
          (endHourNumber - startHourNumber) * 5 +
          ((endMinuteNumber - startMinuteNumber) / 60) * 5;

        if (height < 5) {
          height = 5;
        }

        let totalMinutes =
          endHourNumber * 60 +
          endMinuteNumber -
          (startHourNumber * 60 + startMinuteNumber);

        if (totalMinutes < 0) {
          totalMinutes = 24 * 60 + totalMinutes;
        }

        const durationHour = Math.floor(totalMinutes / 60);
        const durationMinute = totalMinutes % 60;

        return (
          <div
            key={event.id}
            className="event"
            style={{
              top: `${top}rem`,
              height: `${height}rem`,
            }}
          >
            <span className="event-title">{event.title}</span>
            <span className="event-description">{event.description}</span>
            <span className="event-duration">
              {durationHour}h {durationMinute}m
            </span>
            <span className="event-time">
              {startHourString}:{startMinuteString} - {endHourString}:
              {endMinuteString}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default Events;
