import React, { useState } from "react";
import "./AnalyticContent.css";
import editIcon from "../../../../assets/Icons/editIcon.png";
import deleteIcon from "../../../../assets/Icons/deleteIcon.png";
import shareIcon from "../../../../assets/Icons/shareIcon.png";
import { useNavigate } from "react-router-dom";
import QuesWiseAnlysis from "./QuesWiseAnlysis/QuesWiseAnlysis";

import EditPortal from "../../../Edit/EditPortal";
import EditField from "../../../Edit/Edit_Field/EditField";
import axios from "axios";
import DeletePorta from "./Delete_portal/DeletePorta";
import Toast from "../../../../containers/toast/Toast";
export default function AnalyticContent({ analysisData }) {
  const [quizArray, setQuizArray] = useState(analysisData.quizArray);
  const [editPortal, setEditPortal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [quizQuestionArray, setQuizQuestionArray] = useState(null);
  const [quesWise, setQuesWise] = useState(false);
  const [rUSureDelete, setRUSureDelete] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  const navigate = useNavigate();

  const EditHandle = (data) => {
    setEditData(data);
    setEditPortal(true);
  };

  const ApiHandleDeletePortal = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL_PORT}/api/quiz/delete`,
        {
          data: { quizId: quizToDelete },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedQuizArray = quizArray.filter(
        (quiz) => quiz._id !== quizToDelete
      );
      setQuizArray(updatedQuizArray);
      setRUSureDelete(false);
      Toast("Quiz got deleted ", false);
    } catch (error) {
      // console.log(error);
      if (error.response) {
        if (error.response.status == 401) {
          navigate("/");
        }
        alert("Authorization failed");
      } else {
        alert(`Error with ${error.code}`);
      }
    }
  };

  const handleDeleteClick = (quizId) => {
    setQuizToDelete(quizId);
    setRUSureDelete(true);
  };

  const CloseDeletePortal = () => {
    setRUSureDelete(false);
  };

  const CreateCopyUrl = (data) => {
    const url = `https://online-quiz-generator.vercel.app/api/quiz/${data}/quizlive`;
    navigator.clipboard.writeText(url);
    const ele = document.getElementById("share_id_copied");
    // CopiedEffect(ele, '-200%', '58vw');
    Toast("Link copied to Clipboard", true);
  };

  const handleAnalysis = (data, quizType, row) => {
    const quizName = row.quizName;
    const createdAt = row.createdAt;
    const impression = row.impression;
    setQuizQuestionArray({ data, quizType, quizName, createdAt, impression });
    setQuesWise(true);
  };

  const EditHandleClose = () => {
    setEditPortal(false);
  };

  const tableBodyCol5Style = {
    display: "flex",
    justifyContent: "space-around",
    width: "100px",
  };

  const tableBodyCol5TdStyle = {
    paddingTop: "2px",
    paddingLeft: "7px",
    paddingRight: "7px",
    cursor: "pointer",
  };

  const ele = document.getElementById("modal-root");
  const CloseQuesWiseAnlysis = (prams) => {
    // console.log(prams);
    setQuesWise(false);
  };

  return (
    <>
      {rUSureDelete && (
        <DeletePorta
          ApiHandleDeletePortal={ApiHandleDeletePortal}
          CloseDeletePortal={CloseDeletePortal}
        />
      )}
      {quesWise && quizQuestionArray ? (
        <QuesWiseAnlysis
          quizQuestionArray={quizQuestionArray}
          CloseQuesWiseAnlysis={CloseQuesWiseAnlysis}
        />
      ) : (
        <div className="analytic_content_container">
          <div className="analytic_content_main">
            <div
              id="share_id_copied"
              style={{ width: "10px", height: "10px" }}
            ></div>
            <h1>Quiz Analysis</h1>

            {editPortal && (
              <EditPortal
                component={
                  <EditField
                    EditHandleClose={EditHandleClose}
                    editData={editData}
                  />
                }
                element={ele}
              />
            )}

            <div className="analytic_content_table">
              <div className="table_scroll">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead id="table_heading">
                    <tr>
                      <th style={{ width: "45px" }}>S.No</th>
                      <th style={{ width: "90px" }}>Quiz Name</th>
                      <th style={{ width: "105px" }}>Created on</th>
                      <th style={{ width: "92px" }}>Impression</th>
                      <th style={{ width: "92px" }}></th>
                      <th style={{ width: "160px" }}></th>
                    </tr>
                  </thead>
                  <tbody className="table_body">
                    {quizArray.map((row, index) => (
                      <tr className="table_body_row" key={row._id}>
                        <td>{index + 1}</td>
                        <td style={{ minWidth: "100px", maxWidth: "120px" }}>
                          <div className="table_body_row_2nd">
                            {row.quizName}
                          </div>
                        </td>
                        <td>{row.createdAt}</td>
                        <td>{row.impression}</td>
                        <td
                          className="table_body_col5"
                          style={tableBodyCol5Style}
                        >
                          <td
                            onClick={() => EditHandle(row)}
                            style={tableBodyCol5TdStyle}
                          >
                            <img src={editIcon} alt="Edit" />
                          </td>
                          <td style={tableBodyCol5TdStyle}>
                            <img
                              onClick={() => handleDeleteClick(row._id)}
                              src={deleteIcon}
                              alt="Delete"
                            />
                          </td>
                          <td
                            onClick={() => CreateCopyUrl(row.urlId)}
                            style={tableBodyCol5TdStyle}
                          >
                            <img src={shareIcon} alt="Share" />
                          </td>
                        </td>
                        <td
                          onClick={() =>
                            handleAnalysis(
                              row.quizQuestionsArray,
                              row.quizType,
                              row
                            )
                          }
                          style={{
                            marginLeft: "-100px",
                            cursor: "pointer",
                            minWidth: "150px",
                          }}
                        >
                          Question Wise Analysis
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
