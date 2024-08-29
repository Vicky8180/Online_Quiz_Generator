import React from "react";
import "./Quizs.css";
import eyeIcon from "../../assets/Icons/eyeIcon.png";
export default function Quizs({ item }) {
  // console.log(item);
  return (
    <>
      <div className="quizs_container">
        <div className="quizs_name">
          <div className="quizs_name_1st">{item.quizName}</div>
          <div className="quizs_name_2nd">
            {" "}
            <span style={{ marginRight: "5px" }}>{item.impression} </span>
            <img src={eyeIcon} alt="eye" />
          </div>
        </div>

        <div className="quizs_created_at">
          {/* <h5> */}
          Created on : {item.createdAt}
          {/* </h5> */}
        </div>
      </div>
    </>
  );
}
