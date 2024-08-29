import React, { useState, useEffect } from "react";
import "./QuestionCreate.css";
import addIcon from "../../assets/Icons/addIcon.png";
import crossIcon from "../../assets/Icons/crossIcon.png";
import ShakeEffect from "../../containers/ShakeEffect";
import { useDispatch } from "react-redux";
import DropInEffect from "../../containers/DropInEffect";
import { useSelector } from "react-redux";
import { emptyIt } from "../../action";
export default function QuestionCreate({
  inputTimer,
  inputImgText,
  quizType,
  quizName,
  selectedOptionType,
  handleSelectOptionType,
  handleQuestionListChanger,
}) {
  const selectedOption = useSelector((store) => store.selectedOption);
  // console.log(selectedOption)
const dispatch=useDispatch();
  // it holds all the questions list
  const [questions, setQuestions] = useState([]);
  // at  anytime it denotes to single qurstion
  const [questionSingle, setQuestionsSingle] = useState("");

  const handleQuestionsAdd = () => {
    if (questionSingle === "") {
      const element = document.getElementById("questionInput");
      ShakeEffect(element);
      return;
    }

    var tempBool = true;
    inputImgText.map((item) => {
      if (item.type === "text") {
        if (item.text == "") {
          tempBool = false;
        }
      }

      if (item.type === "img") {
        if (item.img == "") {
          tempBool = false;
        }
      }
      if (item.type === "imgtext") {
        if (item.text == "" || item.img == "") {
          tempBool = false;
        }
      }
    });

    if (tempBool === false) {
      const ele = document.getElementById("optionsInput");
      ShakeEffect(ele);
      return;
    }

    if (questions.length < 5) {
      const newQuestion = {
        inputTimer: JSON.parse(JSON.stringify(inputTimer)),
        options: JSON.parse(JSON.stringify(inputImgText)),
        quizType: quizType ? "qna" : "poll",
        quizName: JSON.parse(JSON.stringify(quizName)),
        questionSingle: JSON.parse(JSON.stringify(questionSingle)),
        selectedOptionType: JSON.parse(JSON.stringify(selectedOptionType)),
        selectedOption: selectedOption,
      };
      dispatch(emptyIt("dummy"))
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
    setQuestionsSingle("");
    const ele = document.getElementById("tum");

    if (questions.length === 5) {
      ShakeEffect(ele);
    } else {
     
      DropInEffect(ele);
    }
  };

  useEffect(() => {
    handleQuestionListChanger(questions);
  }, [questions, handleQuestionListChanger]);

  const handleRemoveQuestion = (index2) => {
    setQuestions(questions.filter((_, index) => index !== index2));
  };

  // console.log(questions);
  return (
    <>
      <div className="question_create_container">
        <div className="question_create_header">
          <div className="question_create_list">
            <div className="question_create_list_show">
              {questions.map((item, index) => (
                <div key={index} style={{ position: "relative" }}>
                  {index + 1}
                  {index !== 0 ? (
                    <span
                      key={index}
                      style={{
                        position: "absolute",
                        top: "0px",
                        right: "-2px",
                        color: "black",
                        border: "none",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemoveQuestion(index)}
                    >
                      <img src={crossIcon} alt="cross" />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>

            <button className="question_create_add_btn">
              <img onClick={handleQuestionsAdd} src={addIcon} alt="Add btn" />
            </button>
          </div>
          <p style={{ color: questions.length === 5 ? "red" : "" }}>
            Max 5 Questions
          </p>
        </div>
        <div className="question_create_input">
          <input
            placeholder="Poll Question"
            id="questionInput"
            value={questionSingle}
            onChange={(e) => setQuestionsSingle(e.target.value)}
          />
        </div>
        <div className="question_create_options_type">
          <p>Options Type</p>
          <label className="options_label">
            <input
              type="radio"
              value="texttype"
              checked={selectedOptionType === "texttype"}
              onChange={handleSelectOptionType}
            />
            Text
          </label>
          <br />
          <label className="options_label">
            <input
              type="radio"
              value="imgtype"
              checked={selectedOptionType === "imgtype"}
              onChange={handleSelectOptionType}
            />
            Image URL
          </label>
          <br />
          <label className="options_label">
            <input
              type="radio"
              value="imgtexttype"
              checked={selectedOptionType === "imgtexttype"}
              onChange={handleSelectOptionType}
            />
            Text & Image URL
          </label>
        </div>
      </div>
    </>
  );
}
