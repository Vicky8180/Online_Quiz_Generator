import React, { useState, useEffect } from "react";
import "./Timer.css";

export default function Timer({ handleTimerChanger, timer }) {
  const [selectedButton, setSelectedButton] = useState(timer);

  useEffect(() => {
    setSelectedButton(timer);
  }, [timer]);

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

  useEffect(() => {
    handleTimerChanger(selectedButton);
  }, [selectedButton, handleTimerChanger]);

  const getButtonStyles = (buttonType) => {
    return {
      backgroundColor:
        selectedButton === buttonType ? "red" : "rgba(255, 255, 255, 1)",
      color: selectedButton === buttonType ? "white" : "",
    };
  };

  return (
    <>
      <div className="timer_container">
        <div className="timer_header">Timer</div>
        <div className="timer_off">
          <button
            style={getButtonStyles("OFF")}
            onClick={() => handleButtonClick("OFF")}
          >
            OFF
          </button>
        </div>
        <div className="timer_5sec">
          <button
            style={getButtonStyles("5 Sec")}
            onClick={() => handleButtonClick("5 Sec")}
          >
            5 Sec
          </button>
        </div>
        <div className="timer_10sec">
          <button
            style={getButtonStyles("10 Sec")}
            onClick={() => handleButtonClick("10 Sec")}
          >
            10 Sec
          </button>
        </div>
      </div>
    </>
  );
}
