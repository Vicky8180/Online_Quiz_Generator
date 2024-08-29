import React, { useState } from "react";
import "./SignUpForm.css";

import axios from "axios";
import Toast from "../../../containers/toast/Toast";
import Loader from "../../../components/Loder/Loader";
const SignUpForm = ({ logIn }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errorTracker, setErrorTracker] = useState("No");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      setErrorTracker("yes");
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      setErrorTracker("yes");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      setErrorTracker("yes");
    }

    if (!formData.password) {
      setErrorTracker("yes");
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      setErrorTracker("yes");
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirm_password) {
      setErrorTracker("yes");
      newErrors.confirm_password = "Confirm Password is required";
    } else if (formData.password !== formData.confirm_password) {
      Toast("Passwords do not match", false);
      newErrors.confirm_password = "Passwords do not match";
      setErrorTracker("yes");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const signUpAPI = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_PORT}/api/auth/register`,
        formData
      );
      if (response.status === 200) {
        Toast(response.data.message, true);
        logIn();
      }
    } catch (error) {
      Toast(error.response.data.message, false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      signUpAPI();
    }
  };


  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id={errors.name ? "name_error" : "name"}
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`input_sign_up_form_${errorTracker}`}
          style={{ borderColor: errors.name ? "red" : "" }}
          placeholder={errors.name || "Full name"}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id={errors.email ? "name_error" : "email"}
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ borderColor: errors.email ? "red" : "" }}
          placeholder={errors.email || "Email"}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id={errors.password ? "name_error" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{ borderColor: errors.password ? "red" : "" }}
          placeholder={errors.password || "Password"}
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id={errors.confirm_password ? "name_error" : "confirm_password"}
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          style={{ borderColor: errors.confirm_password ? "red" : "" }}
          placeholder={errors.confirm_password || "Confirm password"}
        />
      </div>

      <button className="bottom_btn" type="submit">
        Sign Up
      </button>
      {loading && <Loader />}
    </form>
  );
};

export default SignUpForm;
