import React from "react";
import "./Quizs.css";
import eyeIcon from "../../assets/Icons/eyeIcon.png";
export default function Quizs({ item }) {
  // console.log(item);
  const formatImpressions = (impressions) => {
    if (impressions < 1000) return impressions.toString();
    if (impressions >= 1000 && impressions < 1e6) return (impressions / 1e3).toFixed(1) + "K";
    if (impressions >= 1e6 && impressions < 1e9) return (impressions / 1e6).toFixed(1) + "M";
    if (impressions >= 1e9) return (impressions / 1e9).toFixed(1) + "B";
    return impressions.toString();
  };
  return (
    <>
      <div className="quizs_container">
        <div className="quizs_name">
          <div className="quizs_name_1st">{item.quizName}</div>
          <div className="quizs_name_2nd">
            {" "}
            <span style={{ marginRight: "5px" }}>{formatImpressions( item.impression)} </span>
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
