import React, { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneLoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setshowOtp] = useState(false);

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handlePhoneSubmmit = (e) => {
    e.preventDefault();

    //phone validation
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("invalid phone number");
      return;
    }
    setshowOtp(true)
    //Call the apis
  };

  const onOtpSubmit=(otp)=>{
    console.log("Login successfull with otp:"+ otp);
  }
  return (
    <div>
      {!showOtp ? (
        <form onSubmit={handlePhoneSubmmit}>
          <input
            type="text"
            placeholder="Enter Phone Number..."
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput  length={4} onOtpSubmit={onOtpSubmit}/>
        </div>
      )}
    </div>
  );
};

export default PhoneLoginForm;
