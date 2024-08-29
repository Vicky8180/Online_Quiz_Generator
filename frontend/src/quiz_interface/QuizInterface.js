

import React, { useEffect, useState, useRef } from "react";
import "./QuizInterface.css";
import "./Img_text_options/ImgTextOptions.css";
import axios from "axios";
import SubmitPage from "./Submit_page/SubmitPage";
import Loader from "../components/Loder/Loader";
import showToast from "../containers/toast/Toast";

export default function QuizInterface() {
  const [index, setIndex] = useState(0);
  const [optionSelectedByUser, setOptionSelectedByUser] = useState(null);
  const [tempArray, setTempArray] = useState([]);
  const [tracker, setTracker] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerStatus, setTimerStatus] = useState("ON");
  const [quizData, setQuizData] = useState();
  const [isAttempted, setIsAttempted] = useState(false);
  const [flag, setFlag] = useState(false);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);

  const quziLiveAPIRef = useRef(false);  

  const optionSelection = (idx) => {
    setOptionSelectedByUser(idx);
  };

  const getTimerValue = () => {
    if (tracker.timer) {
      const tempVar = tracker.timer;
      if (tempVar === "OFF") {
        setTimerStatus("OFF");
        setTimeLeft(null);
      } else {
        const tempVar2 = tempVar.split(" ");
        setTimerStatus("ON");
        setTimeLeft(parseInt(tempVar2[0], 10));
      }
    }
  };

  useEffect(() => {
    getTimerValue();
  }, [tracker]);
  let interval 
  useEffect(() => {
    let interval = null;
    let hasRunNextHandle = false;

    if (timerStatus === "ON" && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1 && !hasRunNextHandle) {
            hasRunNextHandle = true;
            if (flag === false) {
              NextHandle("ForThis");
            }
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeLeft, timerStatus]);

  const extract = (str) => {
    const newStr = str.toString();
    const splitArray = newStr.split("/");
    return splitArray.length > 3
      ? splitArray[splitArray.length - 2]
      : "00000000000000000000";
  };

  const attemptQuestionAPI = async () => {
    if (isAttempted) return;
    setIsAttempted(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_BASE_URL_PORT}/api/quiz/eachquestion`,
        {
          quizType: quizData.quizdata.quizType,
          quizId: quizData.quizdata._id,
          questionId: tracker._id,
          selectedOption: optionSelectedByUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setIsAttempted(false);
    }
  };

  const quziLiveAPI = async () => {
    const urlId = extract(window.location);
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_PORT}/api/quiz/${urlId}/quizlive`
      );
      if (response && response.data.data.quizdata.questions) {
        const tempVar = response.data.data.quizdata.questions;
        setQuizData(response.data.data);
        setTempArray([...tempVar]);
        setTracker(tempVar[0]);
        setIndex(0);
        getTimerValue();
      }
    } catch (error) {
      showToast(error.message, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quziLiveAPIRef.current) {
      quziLiveAPIRef.current = true;
      quziLiveAPI();
    }
  }, []); 

  const NextHandle = async (props) => {
    clearInterval(interval);
    if (props === "ForThis") {
      await attemptQuestionAPI();
    }

    if (tracker.correctOption !== null) {
      if (tracker.correctOption === optionSelectedByUser) {
        setResult(result + 1);
      }
    }

    if (index + 1 >= tempArray.length) {
      setFlag(true);
      return;
    }

    setIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < tempArray.length) {
        setTracker(tempArray[nextIndex]);
        setTimeLeft(null);
        getTimerValue();
        return nextIndex;
      }
      return prevIndex;
    });
  };

  return (
    <div className="quiz_interface_body">
      {loading && <Loader />}
      {tempArray.length > 0 && flag === false ? (
        <div className="quiz_interface_container">
          <div className="quiz_interface_que_no">
            <div className="quiz_interface_on_que">
              {index + 1}/{tempArray.length}
            </div>
            {timerStatus === "ON" && (
              <div className="quiz_interface_timer" style={{ color: "red" }}>
                {timeLeft !== null ? `00:${timeLeft} Sec` : "Loading..."}
              </div>
            )}
          </div>

          <div className="quiz_interface_que_dis">{tracker.question}</div>

          <div className="quiz_interface_opt_dis">
            {tracker.options &&
              tracker.options.map((item, idx) => (
                <React.Fragment key={idx}>
                  {item.optionType === "text" && (
                    <div
                      className="quiz_interface_opt_box"
                      onClick={() => optionSelection(idx)}
                      style={{
                        border:
                          optionSelectedByUser === idx
                            ? "3px solid rgba(80, 118, 255, 1)"
                            : "",
                      }}
                    >
                      <div className="inner-content">{item.text}</div>
                    </div>
                  )}
                  {item.optionType === "img" && (
                    <div
                      className="quiz_interface_opt_box"
                      onClick={() => optionSelection(idx)}
                      style={{
                        height: "150px",
                        overflow: "hidden",
                        border:
                          optionSelectedByUser === idx
                            ? "3px solid rgba(80, 118, 255, 1)"
                            : "",
                      }}
                    >
                      <div
                        style={{ height: "300px" }}
                        className="inner-content"
                      >
                        <img src={item.img} alt="img" />
                      </div>
                    </div>
                  )}
                  {item.optionType === "imgtext" && (
                    <div
                      className="img_text_options_dis_body"
                      onClick={() => optionSelection(idx)}
                      style={{
                        border:
                          optionSelectedByUser === idx
                            ? "3px solid rgba(80, 118, 255, 1)"
                            : "",
                      }}
                    >
                      <div className="img_text_options_dis_container">
                        <div className="text">{item.text}</div>
                        <div className="img_text_img">
                          <img src={item.img} alt="img" />
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>
          <div className="quiz_interface_sub_btn">
            {index + 1 === tempArray.length ? (
              <button onClick={() => NextHandle("ForThis")}>SUBMIT</button>
            ) : (
              <button onClick={() => NextHandle("ForThis")}>NEXT</button>
            )}
          </div>
        </div>
      ) : (
        <>
          {tempArray.length > 0 && flag === true ? (
            <>
              <SubmitPage
                quizType={quizData.quizdata.quizType}
                result={result}
                queNo={tempArray.length}
              />
            </>
          ) : (
            <>
              <div className="quiz_interface_loader">
                <img
                  alt="404 ERROR"
                  width={"40%"}
                  height={"15%"}
                  src="https://static-00.iconduck.com/assets.00/9-404-error-illustration-2048x908-vp03fkyu.png"
                />
                <h1 style={{ color: "white" }}> Sorry ! Page not found</h1>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
