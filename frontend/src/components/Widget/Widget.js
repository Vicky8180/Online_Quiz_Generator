import React from "react";
import "./Widget.css";
export default function Widget({ color, data, type }) {
  return (
    <>
      <div className="widget_container">
        {/* <div style={{width:"300px"}}> */}
        <h1 style={{ color: color }}>{data}</h1>
        <h2 style={{ color: color }}>{type}</h2>
        {/* </div> */}
      </div>
    </>
  );
}
