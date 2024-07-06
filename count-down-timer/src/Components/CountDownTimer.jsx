import React, { useEffect, useRef, useState } from "react";

function CountDownTimer() {
  const [time, setTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });

  const handleChange = (e, type) => {
    const value = parseInt(e.target.value, 10) || 0;

    // setTime({
    //   ...time,
    //   [type]: e.target.value,
    // });
    const newTime = { ...time };
    newTime[type] = value;

    newTime.minutes += Math.floor(newTime.seconds / 60);
    newTime.seconds = newTime.seconds % 60;
    newTime.hours += Math.floor(newTime.minutes / 60);
    newTime.minutes = newTime.minutes % 60;
    newTime.hours = Math.floor(newTime.hours);

    setTime(newTime);

    // console.log(time);
  };

  const [isRunning, setIsRunning] = useState(false);
  const handleStart = () => {
    if (!isRunning) {
      if (time.hours === "" && time.minutes === "" && time.seconds === "") {
        return;
      }
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime({
      hours: "",
      minutes: "",
      seconds: "",
    });
    setIsRunning(false);
  };

  const intervalRef = useRef(null);
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = { ...prevTime };
          if (newTime.seconds > 0) {
            newTime.seconds -= 1;
          } else if (newTime.minutes > 0) {
            newTime.minutes -= 1;
            newTime.seconds = 59;
          } else if (newTime.hours > 0) {
            newTime.hours -= 1;
            newTime.minutes = 59;
            newTime.seconds = 59;
          } else {
            setIsRunning(false);
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <div className="container">
      <div className="input-container">
        <input
          disabled={isRunning}
          type="text"
          placeholder="HH"
          onChange={(e) => handleChange(e, "hours")}
          value={time.hours}
        />
        :
        <input
          disabled={isRunning}
          type="text"
          placeholder="MM"
          onChange={(e) => handleChange(e, "minutes")}
          value={time.minutes}
        />
        :
        <input
          disabled={isRunning}
          type="text"
          placeholder="SS"
          onChange={(e) => handleChange(e, "seconds")}
          value={time.seconds}
        />
      </div>
      <div className="btn-container">
        <button className="start-btn" onClick={handleStart}>
          {isRunning ? "Stop" : "Start"}
        </button>

        {isRunning && <button onClick={handleReset}>Reset</button>}
      </div>
    </div>
  );
}

export default CountDownTimer;
