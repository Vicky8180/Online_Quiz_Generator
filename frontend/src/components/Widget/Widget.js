import React from "react";
import "./Widget.css";
export default function Widget({ color, data, type }) {

  const formatImpressions = (impressions) => {
    if (impressions < 1000) return impressions.toString();
    if (impressions >= 1000 && impressions < 1e6) return (impressions / 1e3).toFixed(1) + "K";
    if (impressions >= 1e6 && impressions < 1e9) return (impressions / 1e6).toFixed(1) + "M";
    if (impressions >= 1e9) return (impressions / 1e9).toFixed(1) + "B";
    return impressions.toString();
  };
  return (
    <>
      <div className="widget_container">
        {/* <div style={{width:"300px"}}> */}
        <h1 style={{ color: color }}>{formatImpressions(data)}</h1>
        <h2 style={{ color: color }}>{type}</h2>
        {/* </div> */}
      </div>
    </>
  );
}
