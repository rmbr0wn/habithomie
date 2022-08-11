import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Form from "./Form.js";

const initialState = { username: "", email: "", password: "", confirmPassword: "" };

export default function Auth () {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const signupPassword = useRef(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function switchFormType () {}

  function handleSubmit () {}

  function handleChange () {}

  function googleSuccess () {}

  function googleFailure () {}

  return (
    <div className="auth-form-container-wrapper">
      <h1> Auth sup </h1>
      <Form
        isSignedUp={isSignedUp}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
        googleSuccess={googleSuccess}
        googleFailure={googleFailure}
        switchFormType={switchFormType}
        signupPassword={signupPassword}
      />
    </div>
  );
}
