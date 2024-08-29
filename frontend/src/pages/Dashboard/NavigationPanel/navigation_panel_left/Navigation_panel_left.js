



import React, { useState, useEffect } from "react";
import "./Navigation_panel_left.css";
import Logo from "../../../../components/Logo/logo";
import DashBoardContent from "../../MainContent/Dash_board_content/DashBoardContent";
import AnalyticContent from "../../MainContent/Analytic_content/AnalyticContent";
import DisplayPortal from "../../MainContent/Create_quize_content/Portal/DisplayPortal";
import QuizeSelector from "../../MainContent/Create_quize_content/Quize_type_selector/QuizeSelector";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { analysisData, validator } from "../../../../action/index";
import Toast from "../../../../containers/toast/Toast.js";

export default function Navigation_panel_left() {
  const [dashboardContent, setDashboardContent] = useState(true);
  const [analyticContennt, setAnalyticContent] = useState(false);
  const [quizCreate, setQuizCreate] = useState(false);
  const [analysisDataState, setAnalysisDataState] = useState(null);

  const state2 = useSelector((state) => state.admin);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state) {
      Toast("Authorization failed", false);
      navigate("/error");
    } else {
      const { data } = state;
      dispatch(validator(state));

      const getQuizDetailsAPI = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL_PORT}/api/quiz/quizanalysis`,
            { userId: data.data._id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            setAnalysisDataState(response.data.data);
            dispatch(analysisData(response.data.data));
          } else if (response.status === 401) {
            Toast("Authorization failed", false);
          } else {
            throw new Error(
              `API request failed with status code ${response.status}`
            );
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 401) {
              navigate("/");
            }
            Toast("Authorization failed", false);
          } else {
            Toast(`Error with ${error.code}`, false);
          }
        }
      };

      getQuizDetailsAPI();
    }
  }, [state, dispatch, navigate]);

  const DashboardContentHandle = () => {
    setQuizCreate(false);
    setAnalyticContent(false);
    setDashboardContent(true);
  };

  const AnalyticContentHandle = () => {
    setQuizCreate(false);
    setAnalyticContent(true);
    setDashboardContent(false);
  };

  const QuizCreateHandle = () => {
    setQuizCreate(true);
    setAnalyticContent(false);
    setDashboardContent(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="navigation_panel_container">
        <div className="navigation_panel_left">
          <div className="navigation_panel_title">
            <Logo />
          </div>
          <div className="navigation_panel_navigator">
            <div
              onClick={DashboardContentHandle}
              style={
                dashboardContent
                  ? {
                      boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.15)",
                      width: "180px",
                      borderRadius: "5px",
                    }
                  : {}
              }
            >
              {" "}
              Dashboard
            </div>
            <div
              onClick={AnalyticContentHandle}
              style={
                analyticContennt
                  ? {
                      boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.15)",
                      width: "180px",
                      borderRadius: "5px",
                    }
                  : {}
              }
            >
              Analytics
            </div>
            <div
              onClick={openModal}
              style={
                quizCreate
                  ? {
                      boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.15)",
                      width: "180px",
                      borderRadius: "5px",
                    }
                  : {}
              }
            >
              {" "}
              Create Quiz
            </div>
          </div>

          <div className="navigation_auth">
            <hr
              style={{
                backgroundColor: "rgba(0, 0, 0, 1)",
                border: "none",
                height: "2px",
                marginTop: "40px",
                width: "60%",
              }}
            />
            <div
              className="dashboard_logout"
              style={{ height: "40px" }}
              onClick={logout}
            >
              Log Out
            </div>
          </div>
        </div>

        <div className="navigation_panel_right">
          {dashboardContent && analysisDataState ? (
            <DashBoardContent analysisData={analysisDataState} />
          ) : null}
          {analyticContennt && analysisDataState ? (
            <AnalyticContent analysisData={analysisDataState} />
          ) : null}

          {isOpen && (
            <DisplayPortal
              container={document.getElementById("modal-root")}
              onClose={closeModal}
            >
              <QuizeSelector closeModal={closeModal} />
            </DisplayPortal>
          )}
        </div>
      </div>
    </>
  );
}
