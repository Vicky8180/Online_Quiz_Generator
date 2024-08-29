import React, { useState } from "react";
import "./QnA.css";
import QuestionCreate from "../../../../../components/Question_create/QuestionCreate";
import Timer from "../../../../../components/Timer/Timer";
import ImgTextType from "../../../../../components/Option_types/Img_text_type/ImgTextType";
import SharePage from "../Share_page/SharePage";
import ShakeEffect from "../../../../../containers/ShakeEffect";
import GlowAndShakeEffect from "../../../../../containers/GlowAndShakeEffect";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import showToast from "../../../../../containers/toast/Toast";
export default function QnA({ closeModal, quizType, quizName }) {
  // state array to hold the all questions
  const [questionsListArray, setQuestionsListArray] = useState([]);
  // state to hold option type
  const [selectedOptionType, setSelectedOptionType] = useState("texttype");
  // its hold the timer
  const [inputTimer, setInputTimer] = useState();
  // state holds img,text & img&text wala data
  const [inputImgText, setInputImgText] = useState();
  // for temporory creat button to work
  const [urlGeneratedOrNot, setUrlGeneratedOrNot] = useState(false);

  const email = localStorage.getItem("email");
  // console.log(email , questionsListArray,quizName, quizType)
  const navigate = useNavigate();

  const [url, setUrl] = useState(null);
  const createQuizAPI = async () => {
    // console.log(questionsListArray);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_PORT}/api/auth/add`,
        { final: questionsListArray, quizName, quizType, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        showToast("Quiz created", true)
        try {
          const response2 = await axios.post(
            `${process.env.REACT_APP_BASE_URL_PORT}/api/quiz/url/generate`,
            { quizId: response.data.savedQuiz._id }
          );

          if (response2) {
            showToast("Url generated", true)
            setUrl(response2.data.data);
            setUrlGeneratedOrNot(true);

          }
        } catch (error) {
          if (error.response2) {
            showToast(error.response2.data.message, false);
          } else {
            showToast(error.code, false);
          }
        }
      }
      // console.log(response);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 401) {
          navigate("/");
        }
        showToast("Authorization failed", false);
      } else {
        showToast(`Error with ${error.code}`, false);
      }
    }
  };

  const creatQuiz = () => {
    if (questionsListArray.length > 0) {
      createQuizAPI();
    } else {
      const ele = document.getElementById("quiz_not_create");
      // ShakeEffect(ele)
      showToast("Please add questions!", false)
      GlowAndShakeEffect(ele);
    }
  };

  const handleImgTextoptionsChanger = (updatedFields) => {
    setInputImgText(updatedFields);
  };

  // getting timer input
  const handleTimerChanger = (callbackTimer) => {
    setInputTimer(callbackTimer);
    // console.log(inputTimer)
  };

  const handleQuestionListChanger = (updatedFields) => {
    setQuestionsListArray(updatedFields);
  };

  // selecting types of options from QuestionsCreate components
  const handleSelectOptionType = (event) => {
    setSelectedOptionType(event.target.value);
  };

  return (
    <>
      {urlGeneratedOrNot == false ? (
        <div className="qna_container" id="tum">
          <QuestionCreate
            inputTimer={inputTimer}
            inputImgText={inputImgText}
            quizType={quizType}
            quizName={quizName}
            selectedOptionType={selectedOptionType}
            handleSelectOptionType={handleSelectOptionType}
            handleQuestionListChanger={handleQuestionListChanger}
          />
          <div className="qna_options_list">
            <div className="qna_options">
              {selectedOptionType === "texttype" ? (
                <ImgTextType
                  quizType={quizType}
                  type={"text"}
                  handleImgTextoptionsChanger={handleImgTextoptionsChanger}
                />
              ) : (
                <></>
              )}
              {selectedOptionType === "imgtype" ? (
                <ImgTextType
                  quizType={quizType}
                  type={"img"}
                  handleImgTextoptionsChanger={handleImgTextoptionsChanger}
                />
              ) : (
                <></>
              )}
              {selectedOptionType === "imgtexttype" ? (
                <ImgTextType
                  quizType={quizType}
                  type={"imgtext"}
                  handleImgTextoptionsChanger={handleImgTextoptionsChanger}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="qna_timers">
              <Timer handleTimerChanger={handleTimerChanger} timer={"OFF"} />
            </div>
          </div>

          <div className="quiz_create_btns">
            <button className="quiz_create_btn1" onClick={() => closeModal()}>
              Cancel
            </button>
            <button
              className="quiz_create_btn2"
              id="quiz_not_create"
              onClick={creatQuiz}
            >
              Create Quiz
            </button>
          </div>
        </div>
      ) : (
        <SharePage closeModal={closeModal} url={url} />
      )}
    </>
  );
}
