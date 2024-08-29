import React, { useEffect, useState } from "react";
import "./EditField.css";
import Timer from "../../../components/Timer/Timer";
import GlowEffect from "../../../containers/GlowEffect";
import updateIcon from "../../../assets/Icons/addIcon.png";
import axios from "axios";
import ShakeEffect from "../../../containers/ShakeEffect";
import Toast from "../../../containers/toast/Toast";
import showAddEffect from "../../../containers/addEffect/AddEffect";

export default function EditField({ EditHandleClose, editData }) {
  // const [questionSingle, setQuestionsSingle] = useState("");
  // const [type, setType] = useState("text");
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState("OFF");
  const [tracker, setTracker] = useState({});
  const [idx, setIdx] = useState(0);
  const [quesToUpdate, setQuesToUpdate] = useState([]);

  useEffect(() => {
    if (editData && Array.isArray(editData.quizQuestionsArray)) {
      setQuestions(editData.quizQuestionsArray);
      setTracker(editData.quizQuestionsArray[idx] || {});
    }
  }, [editData, idx]);

  useEffect(() => {
    if (questions.length > 0) {
      setTracker(questions[idx] || {});
    }
  }, [idx, questions]);

  const editUpdateAPI = async () => {
    try {
      const token = localStorage.getItem("token");
      if (quesToUpdate.length > 0) {
        const response = await axios.patch(
          `${process.env.REACT_APP_BASE_URL_PORT}/api/quiz/edit`,
          { editDataArray: quesToUpdate },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200 && response.data.data.length > 0) {
          Toast("Quiz updated!", true);
          EditHandleClose();
        }
      } else {
        const ele2 = document.getElementById("update_id");
        ShakeEffect(ele2);
        Toast("Click add button!", false);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          Toast("Authorization failed!", false);
          alert("Authorization failed");
        }
      } else {
        Toast(`Error with Server!`);
      }
    }
  };

  const doseChanged = () => {
    let flag = false;

    if (
      tracker &&
      editData &&
      editData.quizQuestionsArray &&
      idx !== undefined
    ) {
      const quizQuestion = editData.quizQuestionsArray[idx];

      if (tracker.question !== quizQuestion.question) {
        flag = true;
      }
     
      if (tracker.timer !== timer && timer !== undefined) {
        flag = true;
      }

      if (
        tracker.options &&
        Array.isArray(tracker.options) &&
        quizQuestion.options &&
        Array.isArray(quizQuestion.options)
      ) {
        tracker.options.forEach((item, index2) => {
          const correspondingOption = quizQuestion.options[index2];

          if (correspondingOption) {
            if (
              item.optionType === "text" &&
              item.optionText !== correspondingOption.optionText
            ) {
              flag = true;
            }

            if (
              item.optionType === "img" &&
              item.optionImg !== correspondingOption.optionImg
            ) {
              flag = true;
            }

            if (
              item.optionType === "imgtext" &&
              (item.optionImg !== correspondingOption.optionImg ||
                item.optionText !== correspondingOption.optionText)
            ) {
              flag = true;
            }
          } else {
            Toast("No corresponding option!", false);
          }
        });
      } else {
        Toast("Options array is missing!", false);
      }

      if (flag) {
        // Check if the question is already in the quesToUpdate state
        const questionIndex = quesToUpdate.findIndex(
          (q) => q._id === tracker._id
        );
        tracker.timer = timer;

        if (questionIndex === -1) {
         
          setQuesToUpdate([...quesToUpdate, tracker]);

          const element = document.getElementById(`question_btn${idx}`);
          if (element) {
            const element2=document.getElementById("tui2")
            showAddEffect(element2)
            GlowEffect(element);
          } else {
            // console.error(`element not found`);
          }
        } else {
       
          const updatedQuestions = [...quesToUpdate];
          // console.log(updatedQuestions);
          // console.log(questionIndex);
          updatedQuestions[questionIndex] = tracker;
          setQuesToUpdate(updatedQuestions);

          const element = document.getElementById(`question_btn${idx}`);
          if (element) {
            GlowEffect(element);
          }
        }
      } else {
        const ele2 = document.getElementById("update_edit_id");
        ShakeEffect(ele2);
        Toast("Please do some changes", false);
      }
    } else {
    }
  };

  const handleTimerChanger = (data) => {
    setTimer(data);
  };

  const changeQuestionEditing = (index) => {
    setIdx(index);
  };

  const isTrackerValid =
    tracker && tracker.options && Array.isArray(tracker.options);

  const handleOptionTextChange = (index, value) => {
    const updatedOptions = [...tracker.options];
    updatedOptions[index] = { ...updatedOptions[index], optionText: value };
    setTracker({ ...tracker, options: updatedOptions });
  };

  const handleOptionImgChange = (index, value) => {
    const updatedOptions = [...tracker.options];
    updatedOptions[index] = { ...updatedOptions[index], optionImg: value };
    setTracker({ ...tracker, options: updatedOptions });
  };

  return (
    <>
      {editData && tracker ? (
        <>
          <div className="tui" id="tui2">
            <div
              className="question_create_container"
              style={{ height: "7vh" , width:"55vw"}}

            >
              <div className="question_create_header">
                <div className="question_create_list">
                  <div className="question_create_list_show">
                    {questions.map((item, index) => (
                      <div
                        onClick={() => changeQuestionEditing(index)}
                        key={index}
                        id={`question_btn${index}`}
                        style={{
                          position: "relative",
                          cursor: "pointer",
                          backgroundColor:
                            idx === index ? "rgba(96, 184, 75, 1)" : "",
                          color: idx === index ? "white" : "",
                        }}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={doseChanged}
                    id="update_id"
                    className="commit_question"
                  >
                    <img alt="update" src={updateIcon} />
                  </button>
                </div>
                <p style={{ color: questions.length > 5 ? "red" : "" }}>
                  Max 5 Questions
                </p>
              </div>
            </div>

            <div id="update_edit_id" className="edit_container">
              <div className="edit_question_box">
                <input
                  className="custom-input-style"
                  placeholder="What is your question can be edited here need not to worry ?"
                  value={tracker.question || ""}
                  onChange={(e) =>
                    setTracker({ ...tracker, question: e.target.value })
                  }
                />
              </div>

              <div className="edit_option_body">
                <div className="edit_option_box">
                  {isTrackerValid && tracker.options[0]?.optionType === "text"
                    ? tracker.options.map((item, idx) => (
                        <div key={idx} className="edit_option_each_box">
                          <input
                            className={`edit_option_each_input ${
                              item.qnaSelected ? "selected" : ""
                            }`}
                            value={
                              item.optionType === "text"
                                ? item.optionText
                                : item.optionType === "img"
                                ? item.optionImg
                                : ""
                            }
                            placeholder={
                              tracker.options[0]?.optionType === "text"
                                ? "Text"
                                : "Img"
                            }
                            onChange={(e) =>
                              handleOptionTextChange(idx, e.target.value)
                            }
                          />
                        </div>
                      ))
                    : null}

                  {isTrackerValid && tracker.options[0]?.optionType === "img"
                    ? tracker.options.map((item, idx) => (
                        <div key={idx} className="edit_option_each_box">
                          <input
                            className={`edit_option_each_input ${
                              item.qnaSelected ? "selected" : ""
                            }`}
                            value={
                              item.optionType === "img" ? item.optionImg : ""
                            }
                            placeholder={
                              tracker.options[0]?.optionType === "img"
                                ? "Img"
                                : "Text"
                            }
                            onChange={(e) =>
                              handleOptionImgChange(idx, e.target.value)
                            }
                          />
                        </div>
                      ))
                    : null}
                  {isTrackerValid &&
                  tracker.options[0]?.optionType === "imgtext"
                    ? tracker.options.map((item2, idx) => (
                        <div key={idx} className="edit_option_each_box">
                          <div>
                            <input
                              className={`edit_option_each_input ${
                                item2.qnaSelected ? "selected" : ""
                              }`}
                              value={item2.optionText}
                              placeholder="Text"
                              onChange={(e) =>
                                handleOptionTextChange(idx, e.target.value)
                              }
                            />
                            <input
                              className={`edit_option_each_input ${
                                item2.qnaSelected ? "selected" : ""
                              }`}
                              value={item2.optionImg}
                              placeholder="Image URL"
                              onChange={(e) =>
                                handleOptionImgChange(idx, e.target.value)
                              }
                            />
                          </div>
                        </div>
                      ))
                    : null}
                </div>

                <div className="edit_option_timer">
                  <div className="edit_option_timer_type">
                    {editData.quizType} Type
                  </div>
                  <Timer
                    handleTimerChanger={handleTimerChanger}
                    timer={tracker.timer}
                  />
                </div>
              </div>
            </div>

            <div className="edit_update_btns">
              <button className="edit_update_btn1" onClick={EditHandleClose}>
                Cancel
              </button>
              <button className="edit_update_btn2" onClick={editUpdateAPI}>
                Update Quiz
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>Oops! Selected Quiz does not exist</div>
          <button onClick={EditHandleClose}>Back</button>
        </>
      )}
    </>
  );
}
