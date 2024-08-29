import React, { useState } from "react";
import "./ImgTextOptions.css";

export default function ImgTextOptions({ data, optionSelection }) {
  const [optionSelectedByUser, setOptionSelectedByUser] = useState(null);



  const optionSelection2 = (idx) => {
    setOptionSelectedByUser(idx);
  };
  // console.log(data);
  return (
    <>
      <div
        className="img_text_options_dis_body"
        onClick={() => optionSelection2(data[2])}
        style={{
          border:
            optionSelectedByUser == data[2]
              ? "3px solid rgba(80, 118, 255, 1)"
              : "",
        }}
      >
        <div className="img_text_options_dis_container">
          <div className="text">{data[1]}</div>
          <div className="img_text_img">
            <img src={data[0]} />
          </div>
        </div>
      </div>
    </>
  );
}
