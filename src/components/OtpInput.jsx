import React, { useEffect, useRef, useState } from "react";
import "../App.css";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRef = useRef([]);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    // console.log(value);
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Submit trigger
    const combineOtp = newOtp.join("");
    if (combineOtp.length == length) onOtpSubmit(combineOtp);

    //Move to next input if current fienld is filled
    if (value && index < length - 1 && inputRef.current[index + 1].focus()) {
      inputRef.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRef.current[index].setSelectionRange(1, 1);

    //OPTIONAL

    if (index > 0 && !otp[index - 1]) {
      inputRef.current[otp.indexOf("")].focus();
    }
    
  };
  const handleKeyDown = (e, index) => {
    if (
      e.key == "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      // Movinf focus to the prev input if we press back
      inputRef.current[index - 1].focus();
    }
  };

  return (
    <div>
      {otp.map((val, index) => {
        return (
          <input
            key={index}
            value={val}
            type="text"
            ref={(input) => (inputRef.current[index] = input)}
            onChange={(e) => handleChange(e, index)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otpInput "
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
