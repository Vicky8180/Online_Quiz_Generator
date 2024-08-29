import React, { useState } from "react";
import SignUpForm from "./sign_up_form/SignUpForm";
import "./AuthContainer.css";
import Logo from "../../components/Logo/logo";
import LoginForm from "./login_form/LoginForm";
export default function AuthContainer() {
  const [btnSelect, setbtnSelect] = useState(false);

  const signUp = () => {
    setbtnSelect(false);
  };
  const logIn = () => {
    setbtnSelect(true);
  };

  return (
    <>
      <div className="auth_container_main">
        <div className="auth_container_title">
          <Logo />
        </div>

        <div className="auth_container_double_btns">
          <button
            className={`button${btnSelect ? "onclick" : "notclick"}`}
            onClick={signUp}
          >
            Sign Up
          </button>
          <button
            className={`button${btnSelect ? "notclick" : "onclick"}`}
            onClick={logIn}
          >
            Log In
          </button>
        </div>
        {btnSelect ? <div style={{marginTop:"-20px"}}><LoginForm /> </div>: <div> <SignUpForm logIn={logIn} /> </div>}
      </div>
    </>
  );
}
