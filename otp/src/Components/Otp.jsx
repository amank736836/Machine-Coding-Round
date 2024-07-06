import React, { useEffect, useRef, useState } from "react";

function Otp({ otpLength = 6 }) {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const ref = useRef(new Array(otpLength).fill(null));

  const handleKeyDown = (e, index) => {
    console.log(e);
    if (e.key === "ArrowLeft") {
      if (index > 0) {
        ref.current[index - 1].focus();
      }
    }
    if (e.key === "ArrowRight") {
      if (index < otpLength - 1) {
        ref.current[index + 1].focus();
      }
    }
    if (e.key === "Backspace") {
      const otpFieldsCopy = [...otpFields];
      otpFieldsCopy[index] = "";
      setOtpFields(otpFieldsCopy);
      if (index > 0) {
        ref.current[index - 1].focus();
      }
    }
    if(isNaN(e.key)) return;
    if (e.key >= 0 && e.key <= 9) {
      const otpFieldsCopy = [...otpFields];
      otpFieldsCopy[index] = e.key;
      setOtpFields(otpFieldsCopy);
      if (index < otpLength - 1) {
        ref.current[index + 1].focus();
      }
    } 
  };

  useEffect(() => {
    ref.current[0].focus();
  }, []);

  return (
    <div className="container">
      {otpFields.map((field, index) => {
        return (
          <input
            type="text"
            ref={(element) => (ref.current[index] = element)}
            key={index}
            value={field}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onChange={(e) => {
              // e.preventDefault();
              // handleKeyDown(e, index);
              return
            }}
             
          />
        );
      })}
    </div>
  );
}

export default Otp;
