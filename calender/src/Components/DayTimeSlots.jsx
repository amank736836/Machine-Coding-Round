import React from "react";

const DayTimeSlots = () => {
  const slots = Array.from({ length: 24 }, (_, i) => i);

  return (
    <>
      {slots.map((slot) => {
        return <div 
            className="time-slot"
        key={slot}>{slot}:00</div>;
      })}
    </>
  );
};

export default DayTimeSlots;
