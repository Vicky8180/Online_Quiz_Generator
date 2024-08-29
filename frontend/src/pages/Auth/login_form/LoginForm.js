import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { admin } from "../../../action";
import Toast from "../../../containers/toast/Toast";
import Loader from "../../../components/Loder/Loader";
export default function LoginForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: { message: "", isValid: true },
    password: { message: "", isValid: true },
  });

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {
      email: { message: "", isValid: true },
      password: { message: "", isValid: true },
    };

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email.message = "Invalid email address";
      newErrors.email.isValid = false;
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password.message = "Password is too short";
      newErrors.password.isValid = false;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: { message: "", isValid: true },
    });
  };

  async function storeTokenWithAutoRemoval() {
    setTimeout(() => {
      localStorage.removeItem("token");
      console.log("Token automatically removed after 8 hours");
    }, 8 * 60 * 60 * 1000);
  }

  const logInAPI = async () => {
    setLoading(true);
    console.log(`${process.env.REACT_APP_BASE_URL_PORT}`)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_PORT}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(admin(response.data));
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("token", response.data.token);
        await storeTokenWithAutoRemoval();
        Toast(response.data.message, true);
        navigate("/navigationpanel", { state: { data: response.data } });
      }
    } catch (error) {
      if (error.response) {
        Toast(error.response.data.message, false);
      } else {
        Toast(error.code, false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      logInAPI();
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group_login">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id={errors.email.isValid ? "name" : "name_error"}
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={
              errors.email.isValid ? "Enter your email" : errors.email.message
            }
          />
        </div>

        <div className="form-group_login">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id={errors.password.isValid ? "password" : "name_error"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={
              errors.password.isValid
                ? "Enter your password"
                : errors.password.message
            }
          />
        </div>

        <button className="bottom_btn" style={{marginTop:"50px"}} type="submit" disabled={loading}>
          Log In
        </button>

        {loading && <Loader />}
      </form>
    </>
  );
}
