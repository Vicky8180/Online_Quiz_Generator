import React from "react";
import winnerIcon from "../../assets/Icons/winnerIcon.png";
import "./SubmitPage.css";
export default function SubmitPage({ quizType, result, queNo }) {
  var flag = false;
  if (quizType === "Poll") {
    flag = false;
  } else {
    flag = true;
  }
  return (
    <>
      {flag ? (
        <>
          <div className="submit_container">
            <div className="submit_heading">Congrats Quiz is completed</div>
            <div className="submit_logo">
              <img alt="winner" src={winnerIcon} />
            </div>
            <div className="submit_result">
              Your Score is{" "}
              <span>
                {result}/{queNo}
              </span>{" "}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="submit_container_2">
            <div className="submit_heading_2">
              Thank you for participating in the Poll
            </div>
          </div>
        </>
      )}
    </>
  );
}
