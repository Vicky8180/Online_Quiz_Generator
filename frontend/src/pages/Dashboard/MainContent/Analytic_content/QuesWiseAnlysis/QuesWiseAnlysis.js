import React, { useState } from "react";
import "./QuesWiseAnlysis.css";

import backIcon from "../../../../../assets/Icons/back-button.png";

export default function QuesWiseAnlysis({
  quizQuestionArray,
  CloseQuesWiseAnlysis,
}) {
  const [isQnAType, setIsQnAType] = useState(true);
//   console.log(CloseQuesWiseAnlysis);
  return (
    <>
      <div className="ques_wise_anlsis_container">
        <div className="ques_wise_anlsis_heading_body">
          <div className="ques_wise_anlsis_heading">
            <img alt="back" onClick={CloseQuesWiseAnlysis} src={backIcon} />
            {quizQuestionArray.quizName}
          </div>
          <div className="ques_wise_anlsis_date">
            <div>Created on : {quizQuestionArray.createdAt}</div>
            <div>Impression:{quizQuestionArray.impression}</div>
          </div>
        </div>

        <div className="ques_wise_anlsis_box_body">
          {quizQuestionArray.data.map((item, idx) => (
            <div className="ques_wise_anlsis_box">
              <div className="ques_wise_anlsis_question">
                Q. {idx + 1} {item.question}
              </div>
              <div className="ques_wise_anlsis_option_box">
                {quizQuestionArray.quizType == "QnA" ? (
                  <>
                    {" "}
                    <div className="ques_wise_anlsis_options">
                      <div className="atttempt_body">
                        <div className="qna_attempt_count">
                          {item.totalAttempt}
                        </div>
                        <div className="attempt_text">
                          people Attempted Question
                        </div>
                      </div>
                    </div>
                    <div className="ques_wise_anlsis_options">
                      <div className="atttempt_body">
                        <div className="qna_attempt_count">
                          {item.correctAnswered != null
                            ? item.correctAnswered
                            : 0}
                        </div>
                        <div className="attempt_text">
                          people Answered Correctly
                        </div>
                      </div>
                    </div>
                    <div className="ques_wise_anlsis_options">
                      <div className="atttempt_body">
                        <div className="qna_attempt_count">
                          {item.correctAnswered != null
                            ? item.totalAttempt - item.correctAnswered
                            : item.totalAttempt}
                        </div>
                        <div className="attempt_text">
                          people Answered Incorrectly
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {item.options.map((item2, index) => (
                      <div className="ques_wise_anlsis_options">
                        <div className="atttempt_body2">
                          <div className="qna_attempt_count2">
                            {item2.pollSelectedCount}
                          </div>
                          {item2.optionType != "img" ? (
                            <>
                              <div className="attempt_text2">
                                <div className="attempt_text2_scroll">
                                  {item2.optionText}{" "}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className="attempt_text2"
                                style={{ overflow: "hidden" }}
                              >
                                <img alt="img" src={item2.optionImg} />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* style={{minWidth:"86%"}} */}
              </div>
              <hr
                style={{
                  backgroundColor: "rgba(215, 215, 215, 1)",
                  border: "none",
                  height: "2px",
                  marginTop: "40px",
                  width: "100%",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
