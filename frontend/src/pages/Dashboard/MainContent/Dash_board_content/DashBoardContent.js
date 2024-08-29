import React from "react";
import "./DashBoardContent.css";
import Widget from "../../../../components/Widget/Widget";
import Quizs from "../../../../components/Quizs/Quizs";
export default function DashBoardContent({ analysisData }) {
  // console.log(analysisData.quizArray);
  return (
    <>
      <div className="dashboard_content_container">
        <div className="dashboard_content_top_component">
          <Widget
            color={"rgba(255, 93, 1, 1)"}
            data={analysisData.quizCount}
            type={"Quiz Created"}
          />
          <Widget
            color={"rgba(96, 184, 75, 1)"}
            data={analysisData.questionCount}
            type={"Question Created"}
          />
          <Widget
            color={"rgba(80, 118, 255, 1)"}
            data={analysisData.impression}
            type={"Total Impression"}
          />
        </div>
        <div className="dashboard_content_bottom_component">
          <p> Trending Quizs </p>

          <div className="dashboard_content_quizs">
            {analysisData.quizArray.map((item, idx) => (
              <Quizs key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
