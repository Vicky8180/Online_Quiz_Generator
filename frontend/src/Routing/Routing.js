import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContainer from "../pages/Auth/AuthContainer";
import NavigationPanel from "../pages/Dashboard/NavigationPanel/navigation_panel_left/Navigation_panel_left";
import LoginForm from "../pages/Auth/login_form/LoginForm";
import QuizInterface from "../quiz_interface/QuizInterface";
import QuesWiseAnlysis from "../pages/Dashboard/MainContent/Analytic_content/QuesWiseAnlysis/QuesWiseAnlysis";
import ErrorPage from "../components/Error_page/ErrorPage";

const AppRoutes = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthContainer />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/navigationpanel" element={<NavigationPanel />} />
        <Route path="api/quiz/:id/quizlive" element={<QuizInterface />} />
        <Route path="/queswiseanalysis" element={<QuesWiseAnlysis />} />  
        <Route path="/error" element={<ErrorPage message={"Unauthorized Access !"}/>} />         

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
